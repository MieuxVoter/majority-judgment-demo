import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import JMSlider from "./JMSlider";
import { Mention } from "./Mention";

const color = "#2400fd";

const StyledSpan = styled.span`
    background-color: ${color};
    width: 24px;
    height: 24px;
    font-size: 16px;
    line-height: 32px;
    color: white;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-right: 8px;
`;

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
    return (
        <div className="proposal-card first">
            <div className="header">
                <div className="d-inline-flex justify-content" color={color}>
                    <StyledSpan>{rank}</StyledSpan> {proposal}
                </div>
                <Button variant="outline-danger" className="btn-delete" onClick={onDeleteClicked}>
                    X
                </Button>
            </div>
            <div>
                <JMSlider
                    {...{ meritProfile, defaultMeritProfile, mentions, onValueChanged }}
                ></JMSlider>
            </div>
            <Container className="p-0 d-flex justify-content-center collapse">
                <div className="chevron bottom"></div>
            </Container>
        </div>
    );
};

export default ProposalCard;
