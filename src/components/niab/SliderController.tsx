import React from "react";
import Slider from 'rc-slider';
import SliderTooltip from "@/components/niab/SliderTooltip";

const SliderController = ({yearsRangeFilter, yearsMinMax, setYearsRangeFilter}: any) => {
    return (
        <>
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
        </>
    );
};

export default SliderController;
