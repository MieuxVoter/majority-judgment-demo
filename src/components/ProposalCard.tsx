import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import JMSlider from "./JMSlider";

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
    proposal,
    onDeleteButtonClicked,
}: {
    proposal: string;
    onDeleteButtonClicked: Function;
}) => {
    const [meritProfile, setMeritProfile] = React.useState([
        BigInt(2),
        BigInt(10),
        BigInt(20),
        BigInt(40),
        BigInt(50),
        BigInt(60),
    ]);

    const onValueChanged = (meritProfile: bigint[]) => {
        setMeritProfile(meritProfile.slice());
    };

    const onDeleteClicked = () => {
        onDeleteButtonClicked(proposal);
    };

    return (
        <div className="proposal-card first">
            <div className="header">
                <div className="d-inline-flex justify-content" color={color}>
                    <StyledSpan>1</StyledSpan> {proposal}
                </div>
                <Button variant="outline-danger" className="btn-delete" onClick={onDeleteClicked}>
                    X
                </Button>
            </div>
            <div>
                <JMSlider meritProfile={meritProfile} onValueChanged={onValueChanged}></JMSlider>
            </div>
            <Container className="p-0 d-flex justify-content-center collapse">
                <div className="chevron bottom"></div>
            </Container>
        </div>
    );
};

export default ProposalCard;
