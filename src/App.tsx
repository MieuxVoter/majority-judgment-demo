import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, Button } from "react-bootstrap";
import ReactSlider from "react-slider";

import styled from "styled-components";

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 20px;
`;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${(props: any) =>
        props.index === 2 ? "#CCC" : props.index === 1 ? "#5A5AFF" : "#CCC"};
    border-radius: 999px;
`;

const StyledThumb = styled.div`
    height: 40px;
    line-height: 40px;
    width: 40px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
    transform: translateY(-10px);
`;

const Thumb = (props: any, state: any) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const Track = (props: any, state: any) => <StyledTrack {...props} index={state.index} />;

const App = () => {
    return (
        <Container className="p-3">
            <StyledSlider
                min={10}
                max={2000}
                defaultValue={[25, 100, 150]}
                renderTrack={Track}
                renderThumb={Thumb}
                pearling
            />
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
