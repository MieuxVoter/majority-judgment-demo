import React from "react";
import ReactSlider from "react-slider";

import styled from "styled-components";

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 16px;
`;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${(props: any) => defaultColors[props.index]};
`;

const excellent = "#3A9918";
const tresBien = "#A0CF1C";
const bien = "#D3D715";
const assezBien = "#C2B113";
const passable = "#C27C13";
const insuffisant = "#C23D13";
const defaultColors = [excellent, tresBien, bien, assezBien, passable, insuffisant];

const StyledThumb = styled.div`
    height: 26px;
    width: 10px;
    text-align: center;
    background-color: #f2f0ff;
    color: #0;
    mix-blend-mode: normal;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    cursor: grab;
    top: -5px;
`;

//{state.valueNow}
const Thumb = (props: any, state: any) => <StyledThumb {...props}></StyledThumb>;

const Track = (props: any, state: any) => <StyledTrack {...props} index={state.index} />;

const JMSlider = ({
    colors,
    min,
    max,
    values,
    onValueChanged,
}: {
    min: number;
    max: number;
    values: number[];
    colors?: string[] | null;
    onValueChanged: (value: any, index: number) => void;
}) => {
    if (colors == null) {
        colors = defaultColors;
    } else if (colors.length != values.length) {
        throw new Error("colors must have the same length than values");
    }

    return (
        <StyledSlider
            min={min}
            max={max}
            value={values}
            renderTrack={Track}
            renderThumb={Thumb}
            onChange={onValueChanged}
            pearling
        />
    );
};

export default JMSlider;
