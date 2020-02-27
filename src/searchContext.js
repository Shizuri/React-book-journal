import React, { useState } from 'react'
const SearchContext = React.createContext()

const SearchContextProvider = props => {
    const [searchTerm, setSearchTerm] = useState('') // The search term
    const [bookResults, setBookResults] = useState([]) // Storage array for all of the books data

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, bookResults, setBookResults }}>
            {props.children}
        </SearchContext.Provider>
    )
}

export { SearchContextProvider, SearchContext }
