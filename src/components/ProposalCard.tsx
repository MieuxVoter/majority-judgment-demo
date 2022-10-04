import React from "react";
import { Container, Button, Collapse } from "react-bootstrap";
import JMSlider from "./JMSlider";
import { getDefaultMentions, getDefaultMeritProfile, Mention } from "./Mention";
import BigIntInput from "./BigIntInput";

const ProposalCard = ({
    rank,
    proposal,
    onDeleteClicked,
    meritProfile,
    defaultMeritProfile,
    mentions,
    onValueChanged,
}: {
    rank: number;
    proposal: string;
    meritProfile?: bigint[] | null;
    defaultMeritProfile?: bigint[] | null;
    mentions?: Mention[] | null;
    onValueChanged?: ((meritProfile: bigint[]) => void) | null;
    onDeleteClicked: () => void;
}) => {
    const [meritProfileState, setMeritProfileState] = React.useState<bigint[]>(
        meritProfile || getDefaultMeritProfile()
    );

    const finalMeritProfile = meritProfile || meritProfileState;

    const [bigIntControlsOpen, setBigIntControlsOpen] = React.useState<boolean>(false);
    const className = rank === 1 ? "proposal-card first" : "proposal-card";
    const finalMentions = mentions || getDefaultMentions();
    const nMention = finalMeritProfile.length

    if (finalMentions.length !== nMention)
        throw new Error("The amount of mention must be the same than mention index amount in meritProfile");

    const mentionControls = [];
    const bigInt = BigInt;

    for (let i = 0; i < nMention; ++i){
        const index = i;
        const onControlChange = (value:bigint)=>{
            finalMeritProfile[index] = value >= bigInt(0) ? value : bigInt(0);
            const newMeritProfile = finalMeritProfile.slice(0); 
            setMeritProfileState(newMeritProfile);
    
            if (onValueChanged != null)
                onValueChanged(newMeritProfile);
        }

        mentionControls.push(<BigIntInput key={i} color={finalMentions[i].color} value={finalMeritProfile[i]} onChange={onControlChange} className="my-3"/>);
    }

    return (
        <div className={className}>
            <div className="header">
                <div className="d-inline-flex justify-content">
                    <span>{rank}</span> {proposal}
                </div>
                <Button variant="outline-danger" className="btn-delete" onClick={onDeleteClicked}>
                    X
                </Button>
            </div>
            <div>
                <JMSlider
                    {...{ meritProfile, defaultMeritProfile, theMentions: finalMentions, onValueChanged }}
                ></JMSlider>
            </div>
            <Collapse in={bigIntControlsOpen}>
                <div id="big-int-controls">
                {mentionControls}
                </div>
            </Collapse>
            <Container className="p-0 d-flex justify-content-center collapse-button" area-aria-controls="big-int-controls" aria-expanded={bigIntControlsOpen} onClick={()=>setBigIntControlsOpen(!bigIntControlsOpen)}>
                <div className={"chevron " + (bigIntControlsOpen ? "top" : "bottom")}></div>
            </Container>
        </div>
    );
};

export default ProposalCard;
