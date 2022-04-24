import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import JMSlider from "./JMSlider";

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
                    <Navbar.Brand>
                        <span className="btn btn-primary">1</span> Cameron Williamson
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-danger">X</Button>
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
