import React from "react"
import DeckGLMap from "./DeckGLMap"
import { ScatterplotLayer } from "@deck.gl/layers"

const DataMap = ({
    mapboxToken = "",
    data = [],
    dotCoordinates = "coordinates",
    displayStat = "cases",
    statMax = 1,
}) => {
    const scatterplotLayer = new ScatterplotLayer({
        id: "scatterplot-layer",
        data,
        stroked: false,
        filled: true,
        getPosition: (d) => d[dotCoordinates],
        getRadius: (d) => {
            const radius = (Math.log10(d[displayStat]) + d[displayStat] / (statMax / 60)) * 20000
            return d[displayStat] > 0 ? radius : 0
        },
        getFillColor: (d) => {
            const red = (d[displayStat] * 255) / statMax
            const green = 255 - (d[displayStat] * 255) / statMax
            const blue = 0
            const opacity = 255 - (d[displayStat] * 170) / statMax
            return [red, green, blue, opacity]
        },
    })

    const layers = [scatterplotLayer]

    return <DeckGLMap mapboxToken={mapboxToken} layers={layers} />
}

export default DataMap
