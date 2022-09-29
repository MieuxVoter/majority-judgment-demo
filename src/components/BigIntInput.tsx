import React, { ChangeEvent, CSSProperties, KeyboardEvent, MouseEvent } from "react";
import { Button, ButtonProps, Form, FormGroupProps } from "react-bootstrap";
import styled from "styled-components";

const StyledControl = styled(Form.Control)`
    width: calc(100% - 140px - 2rem);
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
    width: "35px";
    background-color:${(props:any)=>props.color};
    background-image: url(/${(props:any)=>props.background});
    background-repeat:repeat;
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

interface ButtonStyle {
    color:string,
    background?:string
}

interface BitIntInputProps extends FormGroupProps {
    buttonStyle?:ButtonStyle;
    bigIntValue?: bigint | null;
    defaultBigIntValue?: bigint | null;
    onBigIntValueChange?: ((newValue: bigint) => void) | null;
}

const BigIntInput = (props: BitIntInputProps) => {
    const { buttonStyle, bigIntValue, defaultBigIntValue, className, onBigIntValueChange, ...formGroupProps} = props;

    const [valueState, setValueState] = React.useState<bigint>(
        bigIntValue || defaultBigIntValue || BigInt(0)
    );

    const finalValue = bigIntValue || valueState;

    const bigIntCharCheckOnKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (!event.key.match(/[0-9]/g)) event.preventDefault();
    };

    const setValue = (value: bigint) => {
        setValueState(value);

        if (onBigIntValueChange != null) onBigIntValueChange(value);
    };

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(BigInt(event.target.value));
    };

    const addToValue = (amount: bigint) => (event: MouseEvent<HTMLButtonElement>) =>
        setValue(finalValue + amount);

    return (
        <Form.Group className={className ? "big-int-input px-3 " + className : "big-int-input px-3"} {...formGroupProps}>
            <StyledButton {...buttonStyle} onClick={addToValue(BigInt(-10))}>{"<<"}</StyledButton>
            <StyledButton {...buttonStyle} className="mx-2" onClick={addToValue(BigInt(-1))}>{"<"}</StyledButton>
            <StyledControl
                color={buttonStyle?.color}
                datatype="number"
                onKeyDown={bigIntCharCheckOnKeyDown}
                onChange={onInputChange}
                value={finalValue.toString()}
            ></StyledControl>
            <StyledButton {...buttonStyle} className="mx-2" onClick={addToValue(BigInt(1))}>{">"}</StyledButton>
            <StyledButton {...buttonStyle} onClick={addToValue(BigInt(10))}>{">>"}</StyledButton>
        </Form.Group>
    );
};

export default BigIntInput;
