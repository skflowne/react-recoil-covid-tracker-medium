import React, { Suspense } from "react"
import { RecoilRoot } from "recoil"
import TimelineMap from "./components/map/TimelineMap"
import TimeTravelButtons from "./components/time/TimeTravelButtons"
import TimeTravelSlider from "./components/time/TimeTravelSlider"
import CurrentStatSelect from "./components/stats/CurrentStatSelect"

const App = () => {
    return (
        <RecoilRoot>
            <Suspense fallback="Loading...">
                <TimeTravelButtons />
                <CurrentStatSelect />
                <TimelineMap />
                <TimeTravelSlider />
            </Suspense>
        </RecoilRoot>
    )
}

export default App
