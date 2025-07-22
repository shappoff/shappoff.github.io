import React from "react";
import Slider from '@mui/material/Slider';
import {throttle} from "@/components/prikhody/throttle";

function valuetext(value: number) {
    return `${value} г`;
}

const SliderController = ({yearsRangeFilter, yearsMinMax, setYearsRangeFilter}: any) => {
    if (!yearsRangeFilter.length || !yearsMinMax.length) {
        return <></>
    }
    const [minValue, maxValue] = yearsMinMax;
    const [minFilter, maxFilter] = yearsRangeFilter;

    const handleChange = (_: any, [start, end]: any) => {
        setYearsRangeFilter(start < end ? [start, end] : [end, start]);
    }

    return minValue && maxValue && minFilter && maxFilter ?
        <Slider
            min={minValue}
            step={10}
            max={maxValue}
            size="small"
            getAriaLabel={() => 'Years range'}
            value={[minFilter, maxFilter]}
            onChange={handleChange}
            valueLabelDisplay="on"
            marks
            valueLabelFormat={(x: any) => <span style={{fontSize: 'xx-small'}}>{x} г.</span>}
            getAriaValueText={valuetext}
        /> :
        <></>;
};

export default React.memo(SliderController);
