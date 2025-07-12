import { getGoogleSheetsData, getGoogleSheetsDataArr } from '../gsheets';
import { google } from 'googleapis';
import { sheets_v4 } from 'googleapis/build/src/apis/sheets/v4';

// Mock the googleapis module
jest.mock('googleapis', () => ({
  google: {
    auth: {
      getClient: jest.fn(),
    },
    sheets: jest.fn(),
  },
}));

// Mock environment variables
const mockEnvVars = {
  PROJECT_ID: 'test-project-id',
  GAPI_CREDENTIALS_PRIVATE_KEY: 'test-private-key',
  GAPI_CREDENTIALS_CLIENT_SECRET: 'test-client-secret',
  GAPI_CREDENTIALS_REFRESH_TOKEN: 'test-refresh-token',
  GAPI_CREDENTIALS_CLIENT_EMAIL: 'test-client-email',
  GAPI_CREDENTIALS_CLIENT_ID: 'test-client-id',
};

describe('gsheets', () => {
  let mockSheets: jest.Mocked<sheets_v4.Sheets>;
  let mockAuthClient: any;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Set up environment variables
    Object.entries(mockEnvVars).forEach(([key, value]) => {
      process.env[key] = value;
    });

    // Create mock auth client
    mockAuthClient = {
      projectId: mockEnvVars.PROJECT_ID,
      credentials: {
        type: 'authorized_user',
        private_key: mockEnvVars.GAPI_CREDENTIALS_PRIVATE_KEY,
        client_secret: mockEnvVars.GAPI_CREDENTIALS_CLIENT_SECRET,
        refresh_token: mockEnvVars.GAPI_CREDENTIALS_REFRESH_TOKEN,
        client_email: mockEnvVars.GAPI_CREDENTIALS_CLIENT_EMAIL,
        client_id: mockEnvVars.GAPI_CREDENTIALS_CLIENT_ID,
        token_url: 'https://oauth2.googleapis.com/token',
        universe_domain: 'googleapis.com',
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    };

    // Create mock sheets instance
    mockSheets = {
      spreadsheets: {
        values: {
          get: jest.fn(),
        },
      },
    } as any;

    // Set up the mocks
    (google.auth.getClient as jest.Mock).mockResolvedValue(mockAuthClient);
    (google.sheets as jest.Mock).mockReturnValue(mockSheets);
  });

  afterEach(() => {
    // Clean up environment variables
    Object.keys(mockEnvVars).forEach(key => {
      delete process.env[key];
    });
  });

  describe('getGoogleSheetsData', () => {
    it('should fetch data from Google Sheets with correct parameters', async () => {
      const mockResponse = {
        data: {
          values: [
            ['Name', 'Age', 'City'],
            ['John', '25', 'New York'],
            ['Jane', '30', 'Los Angeles'],
          ],
        },
      };

      (mockSheets.spreadsheets.values.get as jest.Mock).mockResolvedValue(mockResponse);

      const spreadsheetId = 'test-spreadsheet-id';
      const range = 'Sheet1!A1:C3';
      const result = await getGoogleSheetsData(range, spreadsheetId);

      expect(google.auth.getClient).toHaveBeenCalledWith({
        projectId: mockEnvVars.PROJECT_ID,
        credentials: {
          type: 'authorized_user',
          private_key: mockEnvVars.GAPI_CREDENTIALS_PRIVATE_KEY,
          client_secret: mockEnvVars.GAPI_CREDENTIALS_CLIENT_SECRET,
          refresh_token: mockEnvVars.GAPI_CREDENTIALS_REFRESH_TOKEN,
          client_email: mockEnvVars.GAPI_CREDENTIALS_CLIENT_EMAIL,
          client_id: mockEnvVars.GAPI_CREDENTIALS_CLIENT_ID,
          token_url: 'https://oauth2.googleapis.com/token',
          universe_domain: 'googleapis.com',
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      expect(google.sheets).toHaveBeenCalledWith({
        version: 'v4',
        auth: mockAuthClient,
      });

      expect(mockSheets.spreadsheets.values.get).toHaveBeenCalledWith({
        spreadsheetId,
        range,
      });

      expect(result).toEqual(mockResponse.data.values);
    });

    it('should handle empty response', async () => {
      const mockResponse = {
        data: {
          values: [],
        },
      };

      (mockSheets.spreadsheets.values.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getGoogleSheetsData('Sheet1!A1:A1', 'test-id');

      expect(result).toEqual([]);
    });

    it('should handle null response', async () => {
      const mockResponse = {
        data: {
          values: null,
        },
      };

      (mockSheets.spreadsheets.values.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getGoogleSheetsData('Sheet1!A1:A1', 'test-id');

      expect(result).toBeNull();
    });

    it('should throw error when authentication fails', async () => {
      const authError = new Error('Authentication failed');
      (google.auth.getClient as jest.Mock).mockRejectedValue(authError);

      await expect(getGoogleSheetsData('Sheet1!A1:A1', 'test-id')).rejects.toThrow('Authentication failed');
    });

    it('should throw error when sheets API call fails', async () => {
      const apiError = new Error('API call failed');
      (mockSheets.spreadsheets.values.get as jest.Mock).mockRejectedValue(apiError);

      await expect(getGoogleSheetsData('Sheet1!A1:A1', 'test-id')).rejects.toThrow('API call failed');
    });
  });

  describe('getGoogleSheetsDataArr', () => {
    it('should fetch data from multiple spreadsheets', async () => {
      const spreadsheets = {
        users: {
          spreadsheetId: 'users-sheet-id',
          range: 'Sheet1!A1:C3',
        },
        products: {
          spreadsheetId: 'products-sheet-id',
          range: 'Sheet1!A1:B2',
        },
      };

      const mockResponses = [
        {
          data: {
            values: [
              ['Name', 'Age'],
              ['John', '25'],
            ],
          },
        },
        {
          data: {
            values: [
              ['Product', 'Price'],
              ['Laptop', '1000'],
            ],
          },
        },
      ];

      (mockSheets.spreadsheets.values.get as jest.Mock)
        .mockResolvedValueOnce(mockResponses[0])
        .mockResolvedValueOnce(mockResponses[1]);

      const result = await getGoogleSheetsDataArr(spreadsheets);

      expect(mockSheets.spreadsheets.values.get).toHaveBeenCalledTimes(2);
      expect(mockSheets.spreadsheets.values.get).toHaveBeenCalledWith(spreadsheets.users);
      expect(mockSheets.spreadsheets.values.get).toHaveBeenCalledWith(spreadsheets.products);

      expect(result).toEqual({
        users: mockResponses[0].data.values,
        products: mockResponses[1].data.values,
      });
    });

    it('should handle empty spreadsheets config', async () => {
      const spreadsheets = {};

      const result = await getGoogleSheetsDataArr(spreadsheets);

      expect(mockSheets.spreadsheets.values.get).not.toHaveBeenCalled();
      expect(result).toEqual({});
    });

    it('should handle failed API calls for some spreadsheets', async () => {
      const spreadsheets = {
        users: {
          spreadsheetId: 'users-sheet-id',
          range: 'Sheet1!A1:C3',
        },
        products: {
          spreadsheetId: 'products-sheet-id',
          range: 'Sheet1!A1:B2',
        },
      };

      const mockResponses = [
        {
          data: {
            values: [
              ['Name', 'Age'],
              ['John', '25'],
            ],
          },
        },
        null, // Failed response
      ];

      (mockSheets.spreadsheets.values.get as jest.Mock)
        .mockResolvedValueOnce(mockResponses[0])
        .mockResolvedValueOnce(mockResponses[1] as any);

      const result = await getGoogleSheetsDataArr(spreadsheets);

      expect(result).toEqual({
        users: mockResponses[0]!.data.values,
        products: [], // Should default to empty array for failed calls
      });
    });

    it('should handle mixed successful and failed responses', async () => {
      const spreadsheets = {
        users: {
          spreadsheetId: 'users-sheet-id',
          range: 'Sheet1!A1:C3',
        },
        products: {
          spreadsheetId: 'products-sheet-id',
          range: 'Sheet1!A1:B2',
        },
        categories: {
          spreadsheetId: 'categories-sheet-id',
          range: 'Sheet1!A1:A5',
        },
      };

      const mockResponses = [
        {
          data: {
            values: [['Name'], ['John']],
          },
        },
        null, // Failed response
        {
          data: {
            values: [['Category'], ['Electronics']],
          },
        },
      ];

      (mockSheets.spreadsheets.values.get as jest.Mock)
        .mockResolvedValueOnce(mockResponses[0])
        .mockResolvedValueOnce(mockResponses[1] as any)
        .mockResolvedValueOnce(mockResponses[2]);

      const result = await getGoogleSheetsDataArr(spreadsheets);

      expect(result).toEqual({
        users: mockResponses[0]!.data.values,
        products: [], // Failed response defaults to empty array
        categories: mockResponses[2]!.data.values,
      });
    });

    it('should handle responses with null values', async () => {
      const spreadsheets = {
        users: {
          spreadsheetId: 'users-sheet-id',
          range: 'Sheet1!A1:C3',
        },
      };

      const mockResponse = {
        data: {
          values: null,
        },
      };

      (mockSheets.spreadsheets.values.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getGoogleSheetsDataArr(spreadsheets);

      expect(result).toEqual({
        users: [], // Should default to empty array for null values
      });
    });

    it('should throw error when authentication fails', async () => {
      const authError = new Error('Authentication failed');
      (google.auth.getClient as jest.Mock).mockRejectedValue(authError);

      const spreadsheets = {
        users: {
          spreadsheetId: 'users-sheet-id',
          range: 'Sheet1!A1:C3',
        },
      };

      await expect(getGoogleSheetsDataArr(spreadsheets)).rejects.toThrow('Authentication failed');
    });

    it('should handle single spreadsheet config', async () => {
      const spreadsheets = {
        users: {
          spreadsheetId: 'users-sheet-id',
          range: 'Sheet1!A1:C3',
        },
      };

      const mockResponse = {
        data: {
          values: [
            ['Name', 'Age'],
            ['John', '25'],
          ],
        },
      };

      (mockSheets.spreadsheets.values.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getGoogleSheetsDataArr(spreadsheets);

      expect(mockSheets.spreadsheets.values.get).toHaveBeenCalledTimes(1);
      expect(mockSheets.spreadsheets.values.get).toHaveBeenCalledWith(spreadsheets.users);

      expect(result).toEqual({
        users: mockResponse.data.values,
      });
    });
  });

  describe('Environment variables', () => {
    it('should use correct environment variables for authentication', async () => {
      const mockResponse = {
        data: {
          values: [['test']],
        },
      };

      (mockSheets.spreadsheets.values.get as jest.Mock).mockResolvedValue(mockResponse);

      await getGoogleSheetsData('Sheet1!A1:A1', 'test-id');

      expect(google.auth.getClient).toHaveBeenCalledWith({
        projectId: mockEnvVars.PROJECT_ID,
        credentials: {
          type: 'authorized_user',
          private_key: mockEnvVars.GAPI_CREDENTIALS_PRIVATE_KEY,
          client_secret: mockEnvVars.GAPI_CREDENTIALS_CLIENT_SECRET,
          refresh_token: mockEnvVars.GAPI_CREDENTIALS_REFRESH_TOKEN,
          client_email: mockEnvVars.GAPI_CREDENTIALS_CLIENT_EMAIL,
          client_id: mockEnvVars.GAPI_CREDENTIALS_CLIENT_ID,
          token_url: 'https://oauth2.googleapis.com/token',
          universe_domain: 'googleapis.com',
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
    });
  });
}); 