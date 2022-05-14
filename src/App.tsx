import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import ProposalCard from "./components/ProposalCard";

const App = () => {
    return (
        <Container className="p-3">
            <ProposalCard />
        </Container>
    );
};

export default App;
