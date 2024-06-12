import React from "react"
import styled from "styled-components"
import { useRecoilState } from "recoil"
import { currentDateState, DATE_RANGE } from "../../state/app"
import { addDays, subDays, format } from "date-fns"
import Button from "../ui/Button"

const StyledTimeTravelButtons = styled("div")`
    display: flex;
    flex-flow: column;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 50;

    .current-date {
        padding: 1rem;
        width: 100%;
        background-color: #667eea;
        color: #c3dafe;
        text-align: center;
    }

    .buttons {
        display: flex;
        flex-flow: row-nowrap;
        align-items: center;

        .separator {
            height: 100%;
            width: 1px;
            background-color: #bee3f8;
        }
    }
`

const TimeTravelButtons = () => {
    const DAYS_JUMP = 10
    const [currentDate, setCurrentDate] = useRecoilState(currentDateState)

    const jumpForward = (e) => {
        setCurrentDate(addDays(currentDate, DAYS_JUMP))
    }

    const jumpBackward = (e) => {
        setCurrentDate(subDays(currentDate, DAYS_JUMP))
    }

    return (
        <StyledTimeTravelButtons>
            <div className="current-date">{format(currentDate, "LLLL do, yyyy")}</div>
            <div className="buttons">
                <Button disabled={currentDate === DATE_RANGE[0]} onClick={jumpBackward}>
                    &lt;&lt; Backward
                </Button>
                <div className="separator"></div>
                <Button disabled={currentDate === DATE_RANGE[1]} onClick={jumpForward}>
                    Forward &gt;&gt;
                </Button>
            </div>
        </StyledTimeTravelButtons>
    )
}

export default TimeTravelButtons
