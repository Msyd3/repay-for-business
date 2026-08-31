import { ReplitConnectors } from "@replit/connectors-sdk";

const SPREADSHEET_ID = "1s7wtAAzj8JmoERslw3h5W2n-7PltWAnjEL5Omzr1vPE";
const SHEET_TITLE = "الورقة1";

export type ContactLead = {
  name: string;
  company: string;
  email: string;
  mobile: string;
};

export async function appendContactLead(lead: ContactLead): Promise<void> {
  const connectors = new ReplitConnectors();
  const range = encodeURIComponent(`'${SHEET_TITLE}'!A:E`);
  const response = await connectors.proxy(
    "google-sheet",
    `/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        values: [
          [
            new Date().toISOString(),
            lead.name,
            lead.company,
            lead.email,
            lead.mobile,
          ],
        ],
      }),
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Google Sheets append failed (${response.status}): ${details.slice(0, 300)}`,
    );
  }
}