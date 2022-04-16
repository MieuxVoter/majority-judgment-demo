import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, Button } from "react-bootstrap";
import ReactSlider from "react-slider";

import styled from "styled-components";

const StyledSlider = styled(ReactSlider)`
    width: 305px;
    height: 16px;
`;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${(props: any) => colors[props.index]};
`;

const excellent = "#3A9918";
const tresBien = "#A0CF1C";
const bien = "#D3D715";
const assezBien = "#C2B113";
const passable = "#C27C13";
const insuffisant = "#C23D13";
const colors = [excellent, tresBien, bien, assezBien, passable, insuffisant];

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

const App = () => {
    return (
        <Container className="p-3">
            <StyledSlider
                min={0}
                max={100}
                defaultValue={[2, 10, 20, 40, 50]}
                renderTrack={Track}
                renderThumb={Thumb}
                pearling
            />
            <br />
            <br />
            <br />
            <h2>Buttons</h2>
            <div className="p-1">
                <Button variant="primary" className="mr-1">
                    Primary
                </Button>
                <Button variant="secondary" className="mr-1">
                    Secondary
                </Button>
                <Button variant="success" className="mr-1">
                    Success
                </Button>
                <Button variant="warning" className="mr-1">
                    Warning
                </Button>
                <Button variant="danger" className="mr-1">
                    Danger
                </Button>
                <Button variant="info" className="mr-1">
                    Info
                </Button>
                <Button variant="light" className="mr-1">
                    Light
                </Button>
                <Button variant="dark" className="mr-1">
                    Dark
                </Button>
                <Button variant="link" className="mr-1">
                    Link
                </Button>
            </div>
            <h2>Toasts</h2>
        </Container>
    );
};

export default App;
