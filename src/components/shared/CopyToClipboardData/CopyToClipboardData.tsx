import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";

import { CopyToClipboardDataProps } from "./CopyToClipboardData.types";
import { useCopyToClipboardData } from "./useCopyToClipboardData";

const ICON_SIZE_PX = 15;
const SNACKBAR_MESSAGE = "Скопировано";
const DEFAULT_TOOLTIP_TITLE = "Скопировать шифр дела";

function CopyToClipboardData({
  data,
  callback,
  withSnackbar = false,
  tooltipTitle = DEFAULT_TOOLTIP_TITLE,
}: CopyToClipboardDataProps) {
  const { isCopied, openSnackbar, handleCopyClick, handleSnackbarClose } = useCopyToClipboardData({
    data,
    callback,
    withSnackbar,
  });

  return (
    <>
      {isCopied ? (
        <DoneIcon sx={{ fontSize: `${ICON_SIZE_PX}px` }} />
      ) : (
        <Tooltip title={tooltipTitle}>
          <IconButton
            aria-label="copy data to clipboard"
            onClick={handleCopyClick}
            size="small"
          >
            <ContentCopyIcon sx={{ fontSize: `${ICON_SIZE_PX}px` }} />
          </IconButton>
        </Tooltip>
      )}

      {withSnackbar && (
        <Snackbar
          autoHideDuration={2000}
          message={SNACKBAR_MESSAGE}
          onClose={handleSnackbarClose}
          open={openSnackbar}
        />
      )}
    </>
  );
}

export default CopyToClipboardData;
