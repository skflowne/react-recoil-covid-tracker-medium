import React, { useMemo } from "react"
import styled from "styled-components"
import { useRecoilState } from "recoil"
import { currentDateState, DATE_RANGE } from "../../state/app"
import { differenceInCalendarDays, addDays, formatDistanceToNow } from "date-fns"

const StyledTimeTravelSlider = styled("div")`
    display: flex;
    flex-flow: column;
    align-items: center;
    position: absolute;
    bottom: 5rem;
    left: 0;
    width: 100%;
    z-index: 50;

    .slider-container {
        position: relative;
        width: 100%;

        .time-info {
            position: absolute;
            bottom: 1.5rem;
            background-color: #4299e1;
            color: #f7fafc;
            padding: 1rem;
            white-space: nowrap;
            border-radius: 0.25rem;
        }

        input {
            width: 96%;
            margin: 0 2%;
        }
    }
`

const TimeTravelSlider = () => {
    const [currentDate, setCurrentDate] = useRecoilState(currentDateState)
    const maxSliderPos = differenceInCalendarDays(DATE_RANGE[1], DATE_RANGE[0])
    const currentSliderPos = differenceInCalendarDays(currentDate, DATE_RANGE[0])
    const sliderPercentage = (currentSliderPos * 96) / maxSliderPos + 2

    const handleDateChange = (e) => {
        const sliderPos = e.target.value

        const nextDate = addDays(DATE_RANGE[0], sliderPos)
        setCurrentDate(nextDate)
    }

    const timeInfoStyles = useMemo(
        () => ({
            left: `${sliderPercentage}%`,
            transform: `translateX(${sliderPercentage > 15 ? "-100" : "0"}%`,
        }),
        [sliderPercentage]
    )

    return (
        <StyledTimeTravelSlider sliderPercentage={sliderPercentage}>
            <div className="slider-container">
                <div className="time-info" style={timeInfoStyles}>
                    {formatDistanceToNow(currentDate, { addSuffix: true })}
                </div>
                <input type="range" value={currentSliderPos} min={0} max={maxSliderPos} onChange={handleDateChange} />
            </div>
        </StyledTimeTravelSlider>
    )
}

export default TimeTravelSlider
