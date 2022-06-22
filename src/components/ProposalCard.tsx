import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import JMSlider from "./JMSlider";
import { Mention } from "./Mention";
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
    const className = rank == 1 ? "proposal-card first" : "proposal-card";

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
                    {...{ meritProfile, defaultMeritProfile, mentions, onValueChanged }}
                ></JMSlider>
            </div>
            <Container className="p-0 d-flex justify-content-center collapse">
                <div className="chevron bottom"></div>
            </Container>
            <BigIntInput />
        </div>
    );
};

export default ProposalCard;
