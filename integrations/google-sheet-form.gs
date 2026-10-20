/**
 * Shunaya booking form → Google Sheet.
 *
 * Paste into the sheet's Extensions → Apps Script, run `setup` once (this asks
 * for permission), then Deploy → New deployment → Web app with
 * "Execute as: Me" and "Who has access: Anyone". Put the /exec URL in
 * data.js → config.formEndpoint.
 *
 * Each booking also emails ALERT_EMAIL. The address lives here, not on the website,
 * so nobody can use this endpoint to send mail elsewhere.
 *
 * Accepts the website's JSON (sent as text/plain to avoid a CORS preflight) and
 * Elementor's webhook (form fields), so the same deployment works after the
 * WordPress rebuild.
 *
 * If the sheet changes owner, the new owner must redeploy: a deployment runs
 * as whoever created it. A new deployment gets a new URL, so update data.js too.
 *
 * @OnlyCurrentDoc  Google then asks for access to this spreadsheet only, not all of your Sheets.
 */

// [field sent by the form, column heading]. Headings match the form's labels, in the form's order.
const COLUMNS = [
  ['submittedAt', 'Submitted at'],
  ['retreat', 'Retreat'],
  ['name', 'Full name'],
  ['email', 'Email'],
  ['whatsapp', 'WhatsApp number'],
  ['travellingFrom', 'Travelling from'],
  ['seats', 'Seats'],
  ['room', 'Room type'],
  ['notes', 'Anything we should know?']
];
const DATE_FORMAT = 'd mmm yyyy, h:mm am/pm';
const ALERT_EMAIL = 'theshunayaretreats@gmail.com';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = parse_(e);
    // Honeypot: the hidden "website" field is empty for people and filled by bots
    if (data.website) return json_({ ok: true });
    if (!data.name || !(data.email || data.whatsapp)) return json_({ ok: false, error: 'Missing name or contact' });
    const now = new Date();
    const row = COLUMNS.map(function (c) { return c[0] === 'submittedAt' ? now : clean_(data[c[0]]); });
    const sh = sheet_();
    sh.appendRow(row);
    // Sheets gives a newly written date its default format, so re-apply ours
    sh.getRange(sh.getLastRow(), 1).setNumberFormat(DATE_FORMAT);
    // The row is saved; a failed email shouldn't fail the booking
    try { alert_(data, now); } catch (err) { console.error('Booking alert failed: ' + err); }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Emails ALERT_EMAIL a summary of the booking; replying goes straight to the guest
function alert_(data, when) {
  const val = function (k) { const v = data[k]; return v === undefined || v === null || v === '' ? '–' : String(v).slice(0, 2000); };
  const lines = COLUMNS.filter(function (c) { return c[0] !== 'submittedAt' && c[0] !== 'retreat'; })
    .map(function (c) { return c[1] + ': ' + val(c[0]); });
  const digits = String(data.whatsapp || '').replace(/\D/g, '');
  const body = 'New booking request for ' + val('retreat') + '\n\n' + lines.join('\n') +
    (digits ? '\n\nMessage them on WhatsApp: https://wa.me/' + digits : '') +
    '\n\nSubmitted ' + Utilities.formatDate(when, 'Asia/Kolkata', 'd MMM yyyy, h:mm a') +
    '\nAll requests: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const opts = { name: 'Shunaya booking form' };
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || '')) opts.replyTo = data.email;
  const who = val('name').replace(/\s+/g, ' ').slice(0, 80);
  MailApp.sendEmail(ALERT_EMAIL, 'New booking request: ' + who + ' (' + val('retreat') + ')', body, opts);
}

// Run from the editor to grant the email permission and see a sample alert
function testAlert() {
  alert_({ retreat: 'The Undoing', name: 'Test Booking', email: 'test@example.com', whatsapp: '+919999999999', travellingFrom: 'Test city', seats: 2, room: 'Dual sharing', notes: 'Sample alert from the booking form setup, please ignore' }, new Date());
}

// Visiting the URL in a browser just confirms the deployment is live
function doGet() {
  return json_({ ok: true, service: 'Shunaya booking form' });
}

// Run once from the editor: sets India time, adds the header row and asks for permission
function setup() {
  SpreadsheetApp.getActiveSpreadsheet().setSpreadsheetTimeZone('Asia/Kolkata');
  const sh = sheet_();
  const n = COLUMNS.length;
  if (sh.getMaxColumns() > n) sh.deleteColumns(n + 1, sh.getMaxColumns() - n);
  sh.getRange(1, 1, 1, n).setValues([COLUMNS.map(function (c) { return c[1]; })]).setFontWeight('bold');
  sh.setFrozenRows(1);
  sh.getRange('A:A').setNumberFormat(DATE_FORMAT);
}

function sheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function parse_(e) {
  if (e && e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (_) { /* not JSON: fall through to form fields */ }
  }
  return (e && e.parameter) || {};
}

// Text only, capped, and never read as a formula (a leading = + - @ would be)
function clean_(v) {
  if (v === undefined || v === null) return '';
  v = String(v).slice(0, 2000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
