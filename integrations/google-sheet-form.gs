/**
 * Shunaya booking form → Google Sheet.
 *
 * Paste into the sheet's Extensions → Apps Script, run `setup` once (this asks
 * for permission), then Deploy → New deployment → Web app with
 * "Execute as: Me" and "Who has access: Anyone". Put the /exec URL in
 * data.js → config.formEndpoint.
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

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = parse_(e);
    // Honeypot: the hidden "website" field is empty for people and filled by bots
    if (data.website) return json_({ ok: true });
    if (!data.name || !(data.email || data.whatsapp)) return json_({ ok: false, error: 'Missing name or contact' });
    const row = COLUMNS.map(function (c) { return c[0] === 'submittedAt' ? new Date() : clean_(data[c[0]]); });
    const sh = sheet_();
    sh.appendRow(row);
    // Sheets gives a newly written date its default format, so re-apply ours
    sh.getRange(sh.getLastRow(), 1).setNumberFormat(DATE_FORMAT);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
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
