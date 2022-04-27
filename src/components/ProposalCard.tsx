import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import JMSlider from "./JMSlider";

const StyledSpan = styled.span`
    background-color: #2400fd;
    width: 24px;
    height: 24px;
    font-size: 16px;
    line-height: 32px;
    color: white;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const ProposalCard = () => {
    const [sliderMin, setSliderMin] = React.useState(0);
    const [sliderMax, setSliderMax] = React.useState(100);
    const [sliderStats, setSliderStats] = React.useState([2, 10, 20, 40, 50]);
    const onValueChanged = (value: any, index: number) => {
        setSliderStats(value);
    };

    return (
        <Container className="proposal-card">
            <Navbar>
                <Container>
                    <Navbar.Brand className="justify-content">
                        <StyledSpan>1</StyledSpan> Cameron Williamson
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-danger" className="btn-delete">
                            X
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="proposal-body">
                <JMSlider
                    min={sliderMin}
                    max={sliderMax}
                    values={sliderStats}
                    onValueChanged={onValueChanged}
                ></JMSlider>
            </Container>
            <Container>i</Container>
        </Container>
    );
};

export default ProposalCard;
