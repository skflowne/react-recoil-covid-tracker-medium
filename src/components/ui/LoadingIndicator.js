import React from "react"
import styled from "styled-components"
import Loader from "react-loader-spinner"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const StyledLoadingIndicator = styled("div")`
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
`

const LoadingIndicator = () => {
    return (
        <StyledLoadingIndicator>
            <Loader type="Oval" color="#667EEA" height={40} width={40} />
        </StyledLoadingIndicator>
    )
}

export default LoadingIndicator
