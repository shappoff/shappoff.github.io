export interface CopyToClipboardDataProps {
  data: string;
  callback?: () => void;
  withSnackbar?: boolean;
  tooltipTitle?: string;
}
