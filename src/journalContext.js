import React, { useState, useEffect } from 'react'
const JournalContext = React.createContext()

const JournalContextProvider = props => {
    const [myBooks, setMyBooks] = useState([]) // List of all of the books in the Journal

    const addBookToJournal = (bookId, bookTitle, bookThumbnail) => {
        const book = { bookId, bookTitle, bookThumbnail }

        // Check if the book is already in the Journal, if not add it to localStorage and update the state
        if(myBooks.some(b => b.bookId === bookId)){
            alert('This book is already in your Journal')
        } else {
            setMyBooks(prevMyBooks => {
                const updatedBooks = [...prevMyBooks, book]
                localStorage.setItem("books", JSON.stringify(updatedBooks))
                return updatedBooks
            })
        }
    }

    useEffect(() => {
        // Load the books from localStorage to state at the start of the application
        setMyBooks(JSON.parse(localStorage.getItem("books") || "[]"))
    }, [])

    return (
        <JournalContext.Provider value={{
            myBooks,
            setMyBooks,
            addBookToJournal
        }}>
            {props.children}
        </JournalContext.Provider>
    )
}

export { JournalContextProvider, JournalContext }
