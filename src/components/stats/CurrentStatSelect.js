import React from "react"
import styled from "styled-components"
import { useRecoilState } from "recoil"
import { currentStatState, availableStats } from "../../state/app"

const StyledCurrentStatSelect = styled("div")`
    display: flex;
    flex-flow: column;
    align-items: center;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 50;
    width: 10%;

    select {
        padding: 0.5rem;
        border: none;
        width: 100%;
    }
`

const CurrentStatSelect = () => {
    const [currentStat, setCurrentStat] = useRecoilState(currentStatState)

    const handleStatChange = (e) => {
        const newStat = e.target.value
        setCurrentStat(newStat)
    }

    return (
        <StyledCurrentStatSelect>
            <select value={currentStat} onChange={handleStatChange}>
                {availableStats.map((stat) => {
                    return (
                        <option key={stat} value={stat}>
                            {stat[0].toUpperCase() + stat.slice(1)}
                        </option>
                    )
                })}
            </select>
        </StyledCurrentStatSelect>
    )
}

export default CurrentStatSelect
