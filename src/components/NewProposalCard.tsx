import React, { SyntheticEvent } from "react";
import { Button, Form } from "react-bootstrap";

const NewProposalCard = ({ onNewProposalSubmitted }: { onNewProposalSubmitted: Function }) => {
    const onSubmit = (pEvent: SyntheticEvent) => {
        pEvent.preventDefault();
        let element: HTMLElement = pEvent.target as HTMLElement;
        let input = element.querySelector("#new-proposal") as HTMLInputElement;
        onNewProposalSubmitted(input.value);
        input.value = "";
    };

    return (
        <Form onSubmit={onSubmit} className="proposal-card new d-flex">
            <Form.Control type="text" id="new-proposal" placeholder="New Proposal" />
            <Button variant="primary" type="submit">
                +
            </Button>
        </Form>
    );
};

export default NewProposalCard;
