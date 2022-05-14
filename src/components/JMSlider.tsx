import React from "react";
import { Container, Button } from "react-bootstrap";
import ReactSlider from "react-slider";
import { Proposal, ProposalAnalysis } from "scalable-majority-judgment";

import styled from "styled-components";

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 16px;
    top: 50%;
    transform: translateY(-50%);
`;

const StyledContainer = styled.div`
    position: relative;
    height: 50px;
    padding: 19px;
`;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${(props: any) => defaultMentions[props.index].color};
`;

const StyledDiv = styled.div`
    background-color: ${(props: any) => {
        return props.color;
    }};
`;

type Mention = {
    name: string;
    color: string;
};

const defaultMentions: Mention[] = [
    { name: "Excellent", color: "#3A9918" },
    { name: "Très Bien", color: "#A0CF1C" },
    { name: "Bien", color: "#D3D715" },
    { name: "Assez Bien", color: "#C2B113" },
    { name: "Passable", color: "#C27C13" },
    { name: "Insuffisant", color: "#C23D13" },
];

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
const MentionDiv = (props: any) => <StyledDiv {...props} />;
const analysis: ProposalAnalysis = new ProposalAnalysis();

const JMSlider = ({
    colors: mentions,
    min,
    max,
    values,
    onValueChanged,
}: {
    min: number;
    max: number;
    values: number[];
    colors?: Mention[] | null;
    onValueChanged: (value: any, index: number) => void;
}) => {
    if (mentions == null) {
        mentions = defaultMentions;
    } else if (mentions.length != values.length) {
        throw new Error("colors must have the same length than values");
    }

    const meritProfile: bigint[] = [];
    let previous = 0;

    for (let i = 0; i < values.length; ++i) {
        meritProfile[i] = BigInt(values[i] - previous);
        previous = values[i];
    }

    meritProfile.push(BigInt(max - previous));

    analysis.update(new Proposal(meritProfile), false);
    const mention = mentions[analysis.medianMentionIndex];
    console.log("color: " + mention.color);

    return (
        <>
            <MentionDiv className="mention-container" color={mention.color}>
                {mention.name}
            </MentionDiv>
            <StyledContainer>
                <StyledSlider
                    min={min}
                    max={max}
                    value={values}
                    renderTrack={Track}
                    renderThumb={Thumb}
                    onChange={onValueChanged}
                    pearling
                />
                <div className="jm-vr"></div>
            </StyledContainer>
        </>
    );
};

export default JMSlider;
