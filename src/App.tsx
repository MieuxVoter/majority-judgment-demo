import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import ProposalCard from "./components/ProposalCard";
import NewProposalCard from "./components/NewProposalCard";
import { getDefaultMeritProfile } from "./components/JMSlider";
import {
    IDeliberator,
    MajorityJudgmentDeliberator,
    Proposal,
    Tally,
    TallyCollector,
} from "scalable-majority-judgment";

type NamedProposal = {
    rank: number;
    name: string;
    meritProfile: bigint[];
};

const App = () => {
    const [lastUpdateTime, setLastUpdateTime] = React.useState<number>(0);
    const [proposals, setProposals] = React.useState<NamedProposal[]>([
        { rank: 0, name: "Cameron Williamson", meritProfile: getDefaultMeritProfile() },
        { rank: 0, name: "George Bush", meritProfile: getDefaultMeritProfile() },
    ]);

    React.useEffect(() => {
        const deliberator: IDeliberator = new MajorityJudgmentDeliberator();
        const result = deliberator.deliberate(
            new Tally(
                proposals.map((proposal) => new Proposal(proposal.meritProfile.slice().reverse()))
            )
        );

        for (let i = 0; i < proposals.length; ++i) {
            proposals[i].rank = result.proposalResults[i].rank;
        }

        setProposals(proposals.slice(0));
    }, [lastUpdateTime]);

    const onNewProposalSubmitted = (newProposal: string) => {
        setProposals([
            ...proposals,
            { name: newProposal, rank: 0, meritProfile: getDefaultMeritProfile() },
        ]);

        setLastUpdateTime(Date.now());
    };

    const onProposalMeritProfileUpdated = (proposal: NamedProposal, meritProfile: bigint[]) => {
        proposal.meritProfile = meritProfile;
        setProposals(proposals.slice());
        setLastUpdateTime(Date.now());
    };

    const onProposalDeleted = (proposalToDelete: NamedProposal) => {
        let index = proposals.indexOf(proposalToDelete);

        if (index != -1) {
            proposals.splice(index, 1);
            setProposals(proposals.slice(0));
        }

        setLastUpdateTime(Date.now());
    };

    return (
        <Container className="p-3">
            {proposals.map((proposal) => (
                <ProposalCard
                    rank={proposal.rank}
                    proposal={proposal.name}
                    meritProfile={proposal.meritProfile}
                    onValueChanged={(meritProfile) =>
                        onProposalMeritProfileUpdated(proposal, meritProfile)
                    }
                    onDeleteClicked={() => onProposalDeleted(proposal)}
                />
            ))}
            <NewProposalCard onNewProposalSubmitted={onNewProposalSubmitted} />
        </Container>
    );
};

export default App;
