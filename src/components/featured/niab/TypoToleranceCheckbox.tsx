import React from "react";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './TypoToleranceCheckbox.css';

const TypoToleranceCheckbox = ({isTypoTolerance, setIsTypoTolerance}: any) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsTypoTolerance(!event.target.checked);
    };
    return (
        <FormControlLabel className="typo-tolerance-checkbox-label form-control-label-ff form-check-label-ff" control={
            <Switch className="typo-tolerance-checkbox" size="small" onChange={handleChange} checked={!isTypoTolerance} />
        } label={
            <span className="form-check-label">Точное совпадение</span>
        }
        />
    );
};

export default React.memo(TypoToleranceCheckbox);
