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

export type Mention = {
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
    mentions,
    meritProfile,
    defaultMeritProfile,
    onValueChanged,
}: {
    meritProfile?: bigint[] | null;
    defaultMeritProfile?: bigint[] | null;
    mentions?: Mention[] | null;
    onValueChanged?: ((meritProfile: bigint[]) => void) | null;
}) => {
    if (meritProfile) defaultMeritProfile = meritProfile;
    else if (!defaultMeritProfile) {
        mentions = mentions || defaultMentions;

        if (mentions.length == 0) throw new Error("Mentions parameter cannot be empty");

        const amountPerMention = BigInt(Math.round(100 / mentions.length));
        defaultMeritProfile = mentions.map((_) => amountPerMention);
    } else if (defaultMeritProfile.length == 0) {
        throw new Error("defaultMeritProfile cannot be empty");
    }

    const [tmpMeritProfile, tmpSetMeritProfile] = React.useState<bigint[]>(defaultMeritProfile);
    let internalMeritProfile: bigint[];
    let setInternalMeritProfile: ((meritProfile: bigint[]) => void) | null = null;

    if (meritProfile) {
        if (meritProfile.length == 0) throw new Error("meritProfile cannot be empty");

        internalMeritProfile = meritProfile;
    } else {
        if (!defaultMeritProfile) {
            if (mentions) {
                if (mentions.length == 0) throw new Error("Mentions parameter cannot be empty");

                defaultMeritProfile = mentions.map((_) => BigInt(1));
            } else {
                throw new Error("Must define meritProfile or defaultMeritProfile or mentions.");
            }
        } else if (defaultMeritProfile.length == 0) {
            throw new Error("defaultMeritProfile cannot be empty");
        }

        internalMeritProfile = tmpMeritProfile;
        setInternalMeritProfile = tmpSetMeritProfile;
    }

    if (mentions == null) {
        if (internalMeritProfile.length == defaultMentions.length) mentions = defaultMentions;
        else
            throw new Error(
                "The merit profile does not have the same amount of default mentions. Define your own mentions in parameters"
            );
    } else if (mentions.length != internalMeritProfile.length) {
        throw new Error("mentions parameter must have the same length than meritProfile");
    }

    const sliderValues: number[] = [];
    const nMention = internalMeritProfile.length;
    let counter: number = 0;

    for (var i = 0; i < nMention - 1; i++) {
        counter += Number(internalMeritProfile[i]);
        sliderValues.push(counter);
    }

    const max: number = counter + Number(internalMeritProfile[nMention - 1]);

    const onValueChangedInternal = (sliderValues: any, index: number) => {
        let previous = 0;

        for (let i = 0; i < sliderValues.length; ++i) {
            internalMeritProfile[i] = BigInt(sliderValues[i] - previous);
            previous = sliderValues[i];
        }

        internalMeritProfile[sliderValues.length] = BigInt(max - previous);

        if (onValueChanged) onValueChanged(internalMeritProfile);

        if (setInternalMeritProfile) setInternalMeritProfile(internalMeritProfile.slice());
    };

    analysis.update(new Proposal(internalMeritProfile), false);
    const mention = mentions[analysis.medianMentionIndex];

    return (
        <>
            <MentionDiv className="mention-container" color={mention.color}>
                {mention.name}
            </MentionDiv>
            <StyledContainer>
                <StyledSlider
                    min={0}
                    max={max}
                    value={sliderValues}
                    renderTrack={Track}
                    renderThumb={Thumb}
                    onChange={onValueChangedInternal}
                    pearling
                />
                <div className="jm-vr"></div>
            </StyledContainer>
        </>
    );
};

export default JMSlider;
