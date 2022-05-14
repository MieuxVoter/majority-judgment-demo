import React from "react";
import { Button, Form } from "react-bootstrap";

const NewProposalCard = () => {
    return (
        <Form className="proposal-card new d-flex">
            <Form.Control type="text" placeholder="New Candidate" />
            <Button variant="primary" type="submit" className="ml-2">
                +
            </Button>
        </Form>
    );
};

export default NewProposalCard;
