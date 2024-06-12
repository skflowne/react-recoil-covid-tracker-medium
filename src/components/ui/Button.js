import React from "react"
import styled from "styled-components"

const StyledButton = styled("button")`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    background-color: #4299e1;
    color: #bee3f8;
    padding: 0.75rem 1.5rem;
    outline: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #63b3ed;
        color: #ebf8ff;
    }

    &:disabled {
        background-color: #e2e8f0;
        color: #edf2f7;
        cursor: initial;
    }
`

const Button = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
