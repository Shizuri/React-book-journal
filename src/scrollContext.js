// This component provides the scroll state for the BookBrowser and Journal components
// so that they have individual scroll states instead of sharing the same one.
// This provides for a better user experience.
import React, { useState } from 'react'
const ScrollContext = React.createContext()

const ScrollContextProvider = props => {
    const [bookBrowserScrollPosition, setBookBrowserScrollPosition] = useState(0)
    const [journalScrollPosition, setJournalScrollPosition] = useState(0)

    return (
        <ScrollContext.Provider value={{
            bookBrowserScrollPosition,
            setBookBrowserScrollPosition,
            journalScrollPosition,
            setJournalScrollPosition
        }}>
            {props.children}
        </ScrollContext.Provider>
    )
}

export { ScrollContextProvider, ScrollContext }
