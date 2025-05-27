import React from "react";
declare const IndicateButton: ({ item, setIsShowPanel, label }: any) => React.JSX.Element;
declare const sendTGMessage: (text: string) => Promise<Response>;
export { sendTGMessage };
export default IndicateButton;
