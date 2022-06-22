import React, { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Button, Form } from "react-bootstrap";

const BigIntInput = () => {
    const [value, setValue] = React.useState<bigint>(BigInt(0));

    const preventDecimalOnKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (!event.key.match(/[0-9]/g)) event.preventDefault();
    };

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(BigInt(event.target.value));
    };

    const addToValue = (amount: bigint) => (event: MouseEvent<HTMLButtonElement>) =>
        setValue(value + amount);

    return (
        <Form.Group>
            <Button onClick={addToValue(BigInt(-10))}>{"<<"}</Button>
            <Button onClick={addToValue(BigInt(-1))}>{"<"}</Button>
            <Form.Control
                datatype="number"
                onKeyDown={preventDecimalOnKeyDown}
                onChange={onInputChange}
                value={value.toString()}
            ></Form.Control>
            <Button onClick={addToValue(BigInt(1))}>{">"}</Button>
            <Button onClick={addToValue(BigInt(10))}>{">>"}</Button>
        </Form.Group>
    );
};

export default BigIntInput;
