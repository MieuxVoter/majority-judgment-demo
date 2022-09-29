import React, { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

const StyledControl = styled(Form.Control)`
    width: calc(100% - ${(props: any) =>"140px"} - 2rem);
    display: inline-flex;
    text-align:center;
    border-color: ${(props:any)=>props.color} !important;

    &:focus, &:active, &:focus, &:visited  {
        box-shadow: 0 0 0 0.25rem ${(props:any)=>{
            return props.color + "80"
        }};
    }
`;

const StyledButton = styled(Button)`
    width: ${(props: any) =>"35px"};
    background-color:${(props:any)=>props.color};
    border-color:${(props:any)=>props.color};

    &:hover, &:focus, &:active {
        background-color:${(props:any)=>props.color};
        border-color:${(props:any)=>props.color};
    }

    &:focus, &:active, &:focus {
        box-shadow: 0 0 0 0.25rem ${(props:any)=>{
            return props.color + "80"
        }};
    }
`;

const BigIntInput = ({
    value,
    defaultValue,
    className,
    onChange,
    color
}: {
    color?:string|null;
    className?:string|null;
    value?: bigint | null;
    defaultValue?: bigint | null;
    onChange?: ((newValue: bigint) => void) | null;
}) => {
    const [valueState, setValueState] = React.useState<bigint>(
        value || defaultValue || BigInt(0)
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
        setValue(finalValue + amount);

    return (
        <Form.Group className={className ? "big-int-input px-3 " + className : "big-int-input px-3"}>
            <StyledButton color={color} onClick={addToValue(BigInt(-10))}>{"<<"}</StyledButton>
            <StyledButton color={color} className="mx-2" onClick={addToValue(BigInt(-1))}>{"<"}</StyledButton>
            <StyledControl
                color={color}
                datatype="number"
                onKeyDown={bigIntCharCheckOnKeyDown}
                onChange={onInputChange}
                value={finalValue.toString()}
            ></StyledControl>
            <StyledButton color={color} className="mx-2" onClick={addToValue(BigInt(1))}>{">"}</StyledButton>
            <StyledButton color={color} onClick={addToValue(BigInt(10))}>{">>"}</StyledButton>
        </Form.Group>
    );
};

export default BigIntInput;
