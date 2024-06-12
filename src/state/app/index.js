import { selector, atom } from "recoil"
import { isAfter, isBefore, format } from "date-fns"
import { API_DATE_FORMAT, statusByDateQuery } from "../api"

export const DATE_RANGE = [new Date("10 Jan 2020"), new Date()]

export const CASES = "cases"
export const DEATHS = "deaths"
export const RECOVERED = "recovered"

export const availableStats = [CASES, DEATHS, RECOVERED]

export const currentStatState = atom({
    key: "current-stat",
    default: availableStats[0],
})

// new selector
export const currentStatMaxState = selector({
    key: "current-stat-max",
    get: async ({ get }) => {
        const currentStat = get(currentStatState)
        const formattedDate = format(DATE_RANGE[1], API_DATE_FORMAT)
        const status = await get(statusByDateQuery(formattedDate))

        const max = status.reduce((max, countryData) => {
            const countryStat = countryData[currentStat]
            return countryStat > max ? countryStat : max
        }, 0)
        return max
    },
})

const dateState = atom({
    key: "date",
    default: DATE_RANGE[1],
})

export const currentDateState = selector({
    key: "current-date",
    get: ({ get }) => {
        return get(dateState)
    },
    set: ({ set }, nextDate) => {
        let newDate = nextDate
        if (isAfter(newDate, DATE_RANGE[1])) newDate = DATE_RANGE[1]
        if (isBefore(newDate, DATE_RANGE[0])) newDate = DATE_RANGE[0]
        set(dateState, newDate)
    },
})

export const currentFormattedDateState = selector({
    key: "current-formatted-date",
    get: ({ get }) => {
        const currentDate = get(currentDateState)
        return format(currentDate, API_DATE_FORMAT)
    },
})
