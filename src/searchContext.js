// This component provides storage for the BookBrowser part of the application.
// The state is kept here because react-router will unmount the data if it's kept in the BookBrowser component.
// This way we can browse the app and once we return the BookBrowser, the search query and results will still be here.
import React, { useState } from 'react'
const SearchContext = React.createContext()

const SearchContextProvider = props => {
    const [searchTerm, setSearchTerm] = useState('') // The search term
    const [bookResults, setBookResults] = useState([]) // Storage array for all of the books data
    const [totalBooksFound, setTotalBooksFound] = useState() // Number of books found
    const [loadedBooksIndex, setLoadedBooksIndex] = useState(0) // Current index of loaded books. Neaded for loading more books

    return (
        <SearchContext.Provider value={{
            searchTerm,
            setSearchTerm,
            bookResults,
            setBookResults,
            totalBooksFound,
            setTotalBooksFound,
            loadedBooksIndex,
            setLoadedBooksIndex
        }}>
            {props.children}
        </SearchContext.Provider>
    )
}

export { SearchContextProvider, SearchContext }
