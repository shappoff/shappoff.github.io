import React from "react";
import Slider from '@mui/material/Slider';
import './SliderController.css';

function valuetext(value: number) {
    return `${value} г`;
}

const SliderController = ({yearsMinMax, setYearsRangeFilter}: any) => {
    if (!yearsMinMax.length) {
        return <></>
    }
    const [minValue, maxValue] = yearsMinMax;

    const handleChange = (_: any, [start, end]: any) => {
        setYearsRangeFilter(start < end ? [start, end] : [end, start]);
    }

    return <Slider
        min={minValue}
        step={10}
        max={maxValue}
        size="small"
        getAriaLabel={() => 'Years range'}
        defaultValue={yearsMinMax}
        onChangeCommitted={handleChange}
        valueLabelDisplay="on"
        marks
        valueLabelFormat={(x: any) => <span style={{fontSize: 'xx-small'}}>{x} г.</span>}
        getAriaValueText={valuetext}
    />;
};

export default React.memo(SliderController);
