import { selector, selectorFamily, waitForNone } from "recoil"
import { format, subDays, differenceInCalendarDays } from "date-fns"
import { currentDateState, DATE_RANGE } from "../app"

export const API_DATE_FORMAT = "yyyy-MM-dd"

export const countriesQuery = selector({
    key: "countries",
    get: async () => {
        try {
            const res = await fetch("https://covid19-api.org/api/countries")
            const countries = await res.json()
            return countries.reduce((dict, country) => {
                dict[country.alpha2] = country
                return dict
            }, {})
        } catch (e) {
            console.error("ERROR GET /countries", e)
        }
    },
})

export const statusByDateQuery = selectorFamily({
    key: "status-by-date-query",
    get: (formattedDate) => async ({ get }) => {
        try {
            const res = await fetch(`https://covid19-api.org/api/status?date=${formattedDate}`)
            const status = await res.json()

            return status
        } catch (e) {
            console.error("status by date error", e)
        }
    },
})

const PREFETCH_DAYS = 90
export const currentDateStatusState = selector({
    key: "current-date-status-state",
    get: async ({ get }) => {
        const currentDate = get(currentDateState)
        const formattedDate = format(currentDate, API_DATE_FORMAT)
        const status = await get(statusByDateQuery(formattedDate))

        // prefetch previous days
        const toPrefetchDates = new Array(PREFETCH_DAYS)
            .fill(0)
            .map((_, i) => {
                const date = subDays(currentDate, i + 1)
                const diff = differenceInCalendarDays(date, DATE_RANGE[0])
                return diff >= 0 ? format(date, API_DATE_FORMAT) : null
            })
            .filter((date) => date)
        const prefetchQueries = toPrefetchDates.map((date) => statusByDateQuery(date))
        get(waitForNone(prefetchQueries))

        return status
    },
})
