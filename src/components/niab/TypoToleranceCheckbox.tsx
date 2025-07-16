import React from "react";

const TypoToleranceCheckbox = ({isTypoTolerance, setIsTypoTolerance}: any) => {
    return (
        <div className="form-check form-check-inline form-switch typo-tolerance">
            <input className="form-check-input" type="checkbox"
                   role="switch" id="flexSwitchCheckDefault"
                   checked={!isTypoTolerance}
                   onChange={(e: any) => setIsTypoTolerance(!e.target.checked)}/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Точное совпадение</label>
        </div>

    );
};

export default TypoToleranceCheckbox;
