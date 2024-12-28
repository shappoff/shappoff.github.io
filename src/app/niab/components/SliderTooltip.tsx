import React from "react";

interface SliderTooltipProps {
    children: React.ReactNode;
    theme?: any;
}

const SliderTooltip: React.FC<SliderTooltipProps> = ({ children, theme={} }: SliderTooltipProps) => {

    const themeTooltip = {
        ...theme,
        color: theme.color || "red",
        fontSize: theme.fontSize || "11px",
        fontFamily: theme.fontFamily || "var(--bs-font-sans-serif)",
        whiteSpace: theme.whiteSpace || "nowrap",
        position: "relative",
        bottom: "100%",
        transform: "translate(-58%, -10px)",
    }


    return (
        <div style={themeTooltip}>
            {children} г.
        </div>
    );
};

export default SliderTooltip;