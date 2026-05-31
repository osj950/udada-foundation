import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!;
const SHEET = "posts";

function getAuth(readonly = true) {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: [
      readonly
        ? "https://www.googleapis.com/auth/spreadsheets.readonly"
        : "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
}

export type Post = {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  attachmentUrl: string;
  attachmentName: string;
  isPinned: boolean;
};

function rowToPost(r: string[]): Post {
  return {
    id: r[0] ?? "",
    title: r[1] ?? "",
    category: r[2] ?? "",
    content: r[3] ?? "",
    date: r[4] ?? "",
    attachmentUrl: r[5] ?? "",
    attachmentName: r[6] ?? "",
    isPinned: r[7]?.toUpperCase() === "TRUE",
  };
}

export async function getPosts(): Promise<Post[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET}!A:H`,
  });
  const rows = (res.data.values ?? []).slice(1);
  return rows.map(rowToPost).filter((p) => p.id);
}

async function findRowById(id: string): Promise<number> {
  const auth = getAuth(false);
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET}!A:A`,
  });
  const rows = res.data.values ?? [];
  const idx = rows.findIndex((r) => r[0] === id);
  if (idx === -1) throw new Error("항목을 찾을 수 없습니다.");
  return idx + 1;
}

export async function appendPost(data: Omit<Post, "id">): Promise<string> {
  const auth = getAuth(false);
  const sheets = google.sheets({ version: "v4", auth });
  const id = Date.now().toString();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET}!A:H`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[
        id,
        data.title,
        data.category,
        data.content,
        data.date,
        data.attachmentUrl,
        data.attachmentName,
        data.isPinned ? "TRUE" : "FALSE",
      ]],
    },
  });
  return id;
}

export async function updatePost(id: string, data: Omit<Post, "id">) {
  const auth = getAuth(false);
  const sheets = google.sheets({ version: "v4", auth });
  const rowNum = await findRowById(id);
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET}!B${rowNum}:H${rowNum}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[
        data.title,
        data.category,
        data.content,
        data.date,
        data.attachmentUrl,
        data.attachmentName,
        data.isPinned ? "TRUE" : "FALSE",
      ]],
    },
  });
}

// ─── 연혁 ──────────────────────────────────────────────
// 시트명: history / 컬럼: id | year | events (|로 구분된 항목들)

const HISTORY_SHEET = "history";

export type HistoryItem = {
  id: string;
  year: string;
  events: string[]; // 각 항목
};

function rowToHistory(r: string[]): HistoryItem {
  return {
    id: r[0] ?? "",
    year: r[1] ?? "",
    events: (r[2] ?? "").split("|").map((e) => e.trim()).filter(Boolean),
  };
}

export async function getHistoryItems(): Promise<HistoryItem[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${HISTORY_SHEET}!A:C`,
  });
  const rows = (res.data.values ?? []).slice(1);
  return rows.map(rowToHistory).filter((h) => h.id && h.year);
}

async function findHistoryRowById(id: string): Promise<number> {
  const auth = getAuth(false);
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${HISTORY_SHEET}!A:A`,
  });
  const rows = res.data.values ?? [];
  const idx = rows.findIndex((r) => r[0] === id);
  if (idx === -1) throw new Error("항목을 찾을 수 없습니다.");
  return idx + 1;
}

export async function appendHistoryItem(data: Omit<HistoryItem, "id">): Promise<string> {
  const auth = getAuth(false);
  const sheets = google.sheets({ version: "v4", auth });
  const id = Date.now().toString();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${HISTORY_SHEET}!A:C`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[id, data.year, data.events.join("|")]],
    },
  });
  return id;
}

export async function updateHistoryItem(id: string, data: Omit<HistoryItem, "id">) {
  const auth = getAuth(false);
  const sheets = google.sheets({ version: "v4", auth });
  const rowNum = await findHistoryRowById(id);
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${HISTORY_SHEET}!B${rowNum}:C${rowNum}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[data.year, data.events.join("|")]],
    },
  });
}

export async function deleteHistoryItem(id: string) {
  const auth = getAuth(false);
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${HISTORY_SHEET}!A:A`,
  });
  const rows = res.data.values ?? [];
  const idx = rows.findIndex((r) => r[0] === id);
  if (idx === -1) throw new Error("항목을 찾을 수 없습니다.");

  const info = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const sheetId = info.data.sheets?.find((s) => s.properties?.title === HISTORY_SHEET)?.properties?.sheetId;
  if (sheetId === undefined) throw new Error("시트를 찾을 수 없습니다.");

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [{ deleteDimension: { range: { sheetId, dimension: "ROWS", startIndex: idx, endIndex: idx + 1 } } }],
    },
  });
}

// ─── deletePost ────────────────────────────────────────
export async function deletePost(id: string) {
  const auth = getAuth(false);
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET}!A:A`,
  });
  const rows = res.data.values ?? [];
  const idx = rows.findIndex((r) => r[0] === id);
  if (idx === -1) throw new Error("항목을 찾을 수 없습니다.");

  const info = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const sheetId = info.data.sheets?.find((s) => s.properties?.title === SHEET)?.properties?.sheetId;
  if (sheetId === undefined) throw new Error("시트를 찾을 수 없습니다.");

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: { sheetId, dimension: "ROWS", startIndex: idx, endIndex: idx + 1 },
        },
      }],
    },
  });
}
