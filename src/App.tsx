import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import ProposalCard from "./components/ProposalCard";
import NewProposalCard from "./components/NewProposalCard";

const App = () => {
    const [proposals, setProposals] = React.useState<string[]>([
        "Cameron Williamson",
        "George Bush",
    ]);

    const onNewProposalSubmitted = (newProposal: string) => {
        setProposals([...proposals, newProposal]);
    };

    const onProposalDeleted = (proposalToDelete: string) => {
        let index = proposals.indexOf(proposalToDelete);

        if (index != -1) {
            proposals.splice(index, 1);
            setProposals(proposals.slice(0));
        }
    };

    return (
        <Container className="p-3">
            {proposals.map((proposal) => (
                <ProposalCard proposal={proposal} onDeleteButtonClicked={onProposalDeleted} />
            ))}
            <NewProposalCard onNewProposalSubmitted={onNewProposalSubmitted} />
        </Container>
    );
};

export default App;
