import React, { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Button, Form } from "react-bootstrap";

const BigIntInput = ({
    value,
    defaultValue,
    onChange,
}: {
    value?: bigint | null;
    defaultValue?: bigint | null;
    onChange?: ((newValue: bigint) => {}) | null;
}) => {
    const [valueState, setValueState] = React.useState<bigint>(
        defaultValue != null ? defaultValue : BigInt(0)
    );

    const finalValue = value || valueState;

    const bigIntCharCheckOnKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (!event.key.match(/[0-9]/g)) event.preventDefault();
    };

    const setValue = (value: bigint) => {
        setValueState(value);

        if (onChange != null) onChange(value);
    };

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(BigInt(event.target.value));
    };

    const addToValue = (amount: bigint) => (event: MouseEvent<HTMLButtonElement>) =>
        setValue(valueState + amount);

    return (
        <Form.Group>
            <Button onClick={addToValue(BigInt(-10))}>{"<<"}</Button>
            <Button onClick={addToValue(BigInt(-1))}>{"<"}</Button>
            <Form.Control
                datatype="number"
                onKeyDown={bigIntCharCheckOnKeyDown}
                onChange={onInputChange}
                value={finalValue.toString()}
            ></Form.Control>
            <Button onClick={addToValue(BigInt(1))}>{">"}</Button>
            <Button onClick={addToValue(BigInt(10))}>{">>"}</Button>
        </Form.Group>
    );
};

export default BigIntInput;
