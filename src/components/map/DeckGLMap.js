import React from "react"
import DeckGL from "@deck.gl/react"
import { StaticMap } from "react-map-gl"

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -20,
    latitude: 0,
    pitch: 0,
    zoom: 2,
    bearing: 0,
}

const DeckGLMap = ({ mapboxToken = "", layers = [] }) => {
    return (
        <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
            <StaticMap mapboxApiAccessToken={mapboxToken} />
        </DeckGL>
    )
}

export default DeckGLMap
