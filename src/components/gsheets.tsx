import { google } from "googleapis";
import {AnyAuthClient} from "google-auth-library";
import {sheets_v4} from "googleapis/build/src/apis/sheets/v4";

const getAuthedSheets = async (): Promise<sheets_v4.Sheets> => {
    const auth: AnyAuthClient = await google.auth.getClient({
        projectId: process.env.PROJECT_ID,
        credentials: {
            type: "authorized_user",
            private_key: process.env.GAPI_CREDENTIALS_PRIVATE_KEY,
            client_secret: process.env.GAPI_CREDENTIALS_CLIENT_SECRET,
            refresh_token: process.env.GAPI_CREDENTIALS_REFRESH_TOKEN,
            client_email: process.env.GAPI_CREDENTIALS_CLIENT_EMAIL,
            client_id: process.env.GAPI_CREDENTIALS_CLIENT_ID,
            token_url: "https://oauth2.googleapis.com/token",
            universe_domain: "googleapis.com",
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    return google.sheets({ version: "v4", auth } as sheets_v4.Options);
};

export async function getGoogleSheetsData(range: string, spreadsheetId: string) {
    const sheets: sheets_v4.Sheets = await getAuthedSheets();

    const data = await sheets.spreadsheets.values.get({spreadsheetId, range});

    return data.data.values;
}
export async function getGoogleSheetsDataArr(spreadsheets: Record<string, {spreadsheetId: string, range: string}>) {
    const sheets: sheets_v4.Sheets = await getAuthedSheets();
    const entries = Object.entries(spreadsheets);
    const results = await Promise.all(
        entries.map(([_, config]) => sheets.spreadsheets.values.get(config))
    );
    return Object.fromEntries(entries.map(([key], i) => [key, results[i]?.data?.values ?? []]));
}
