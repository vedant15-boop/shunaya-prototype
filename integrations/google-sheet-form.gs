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
 */

// [field sent by the form, column heading]
const COLUMNS = [
  ['submittedAt', 'Submitted at'],
  ['retreat', 'Retreat'],
  ['dates', 'Dates'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['whatsapp', 'WhatsApp'],
  ['room', 'Room'],
  ['roomPrice', 'Room price'],
  ['seats', 'Seats'],
  ['travellingFrom', 'Travelling from'],
  ['notes', 'Notes'],
  ['page', 'Page']
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = parse_(e);
    // Honeypot: the hidden "website" field is empty for people and filled by bots
    if (data.website) return json_({ ok: true });
    if (!data.name || !(data.email || data.whatsapp)) return json_({ ok: false, error: 'Missing name or contact' });
    const row = COLUMNS.map(function (c) { return c[0] === 'submittedAt' ? new Date() : clean_(data[c[0]]); });
    sheet_().appendRow(row);
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

// Run once from the editor: adds the header row and asks for permission
function setup() {
  const sh = sheet_();
  sh.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS.map(function (c) { return c[1]; })]).setFontWeight('bold');
  sh.setFrozenRows(1);
  sh.getRange('A:A').setNumberFormat('d mmm yyyy, h:mm am/pm');
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
