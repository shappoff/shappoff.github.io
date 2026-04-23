import { useCallback, useEffect, useState } from "react";

import { copyToClipboard } from "@/components/utils";

const COPIED_STATE_RESET_DELAY_MS = 2000;

interface UseCopyToClipboardDataParams {
  data: string;
  callback?: () => void;
  withSnackbar: boolean;
}

interface UseCopyToClipboardDataResult {
  isCopied: boolean;
  openSnackbar: boolean;
  handleCopyClick: () => void;
  handleSnackbarClose: () => void;
}

export function useCopyToClipboardData({
  data,
  callback,
  withSnackbar,
}: UseCopyToClipboardDataParams): UseCopyToClipboardDataResult {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = useCallback(() => {
    copyToClipboard(data, () => {
      setIsCopied(true);

      if (withSnackbar) {
        setOpenSnackbar(true);
      }

      callback?.();
    });
  }, [callback, data, withSnackbar]);

  const handleSnackbarClose = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsCopied(false);
    }, COPIED_STATE_RESET_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isCopied]);

  return {
    isCopied,
    openSnackbar,
    handleCopyClick,
    handleSnackbarClose,
  };
}
