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
