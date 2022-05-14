import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import ProposalCard from "./components/ProposalCard";
import NewProposalCard from "./components/NewProposalCard";

const App = () => {
    return (
        <Container className="p-3">
            <ProposalCard />
            <NewProposalCard />
        </Container>
    );
};

export default App;
