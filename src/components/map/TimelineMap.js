import React from "react"
import { useRecoilValueLoadable, useRecoilValue } from "recoil"

import { mapboxToken } from "../../mapbox-token"

import { countriesQuery, currentDateStatusState } from "../../state/api"
import { currentStatState, currentStatMaxState } from "../../state/app"

import DataMap from "./DataMap"
import LoadingIndicator from "../ui/LoadingIndicator"

const TimelineMap = () => {
    const dateStatus = useRecoilValueLoadable(currentDateStatusState)
    const countries = useRecoilValueLoadable(countriesQuery)
    const currentStat = useRecoilValue(currentStatState)
    const currentStatMax = useRecoilValueLoadable(currentStatMaxState)

    const isLoading =
        dateStatus.state === "loading" || countries.state === "loading" || currentStatMax.state === "loading"

    let data = []
    if (!isLoading) {
        data = dateStatus.contents.map((status) => {
            const country = countries.contents[status.country]
            return {
                name: country.name,
                coordinates: [country.longitude, country.latitude],
                ...status,
            }
        })
    }

    return (
        <div className="timeline-map">
            {isLoading ? <LoadingIndicator /> : null}
            <DataMap
                mapboxToken={mapboxToken}
                data={data}
                displayStat={currentStat}
                statMax={currentStatMax.contents}
            />
        </div>
    )
}

export default TimelineMap
