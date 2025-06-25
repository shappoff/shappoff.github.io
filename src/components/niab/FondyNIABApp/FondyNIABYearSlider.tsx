import React from "react";
import Slider from 'rc-slider';
import SliderTooltip from "../SliderTooltip";

const FondyNIABYearSlider = ({yearsRangeFilter, yearsMinMax, setYearsRangeFilter}: any) => (
    <div className="third-raw">
        {
            yearsRangeFilter.length ? <Slider
                handleRender={(renderProps: any) => {
                    return (
                        <div {...renderProps.props}>
                            <SliderTooltip>{renderProps.props['aria-valuenow']}</SliderTooltip>
                        </div>
                    );
                }}
                range
                min={yearsMinMax[0]}
                max={yearsMinMax[1]}
                defaultValue={yearsRangeFilter}
                allowCross={false}
                dots={false}
                onChangeComplete={(e: any) => {setYearsRangeFilter(e)}}
            /> : <></>
        }
    </div>
);

export default FondyNIABYearSlider; 