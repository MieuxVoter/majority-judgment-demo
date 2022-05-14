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

const ProposalCard = () => {
    const [sliderMin, setSliderMin] = React.useState(0);
    const [sliderMax, setSliderMax] = React.useState(100);
    const [sliderStats, setSliderStats] = React.useState([2, 10, 20, 40, 50]);
    const onValueChanged = (value: any, index: number) => {
        setSliderStats(value);
    };

    return (
        <div className="proposal-card first">
            <div className="header">
                <div className="d-inline-flex justify-content" color={color}>
                    <StyledSpan>1</StyledSpan> Cameron Williamson
                </div>
                <Button variant="outline-danger" className="btn-delete">
                    X
                </Button>
            </div>
            <div>
                <JMSlider
                    min={sliderMin}
                    max={sliderMax}
                    values={sliderStats}
                    onValueChanged={onValueChanged}
                ></JMSlider>
            </div>
            <Container className="p-0 d-flex justify-content-center collapse">
                <div className="chevron bottom"></div>
            </Container>
        </div>
    );
};

export default ProposalCard;
