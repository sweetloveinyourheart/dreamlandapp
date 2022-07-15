import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ItemDataDisplay } from "../components/items/rs-items";

interface ViewHistoryInterface {
    history: ItemDataDisplay[]
    storeItem: (item: ItemDataDisplay) => void
}

const ViewHistoryContext = createContext({} as ViewHistoryInterface)

export function useViewHistory() {
    return useContext(ViewHistoryContext)
}

export default function ViewHistoryProvider({ children }: any) {
    const [history, setHistory] = useState<ItemDataDisplay[]>([])

    const storeItem = useCallback((item: ItemDataDisplay) => {
        let current = [...history]

        // check if item already exist
        const isExist = current.find(curItem => {
            if (curItem.directLink === item.directLink) {
                return curItem
            }
        })

        // if item exist, remove it
        if (isExist) {
            current.splice(current.findIndex(v => v.directLink === item.directLink), 1)
        }

        // add item to the top of current list
        current.unshift(item)

        if(current.length > 10) {
            current.pop()
        }

        setHistory(current)
    }, [history, setHistory])

    const memoedValue = useMemo(() => ({
        history,
        storeItem
    }), [history, storeItem])

    return (
        <ViewHistoryContext.Provider value={memoedValue}>
            {children}
        </ViewHistoryContext.Provider>
    )
}