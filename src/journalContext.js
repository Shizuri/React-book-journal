// This component loads the Jurnal Entires from local storage and provides it to the needed components.
// It also holds methods to manipulate books such as adding and removing books.
import React, { useState, useEffect } from 'react'
const JournalContext = React.createContext()

const JournalContextProvider = props => {
    const [myBooks, setMyBooks] = useState([]) // List of all of the books in the Journal

    const addBookToJournal = (bookId, bookTitle, bookThumbnail) => {
        // TODO: REFACTOR THIS TO TAKE AN OBJECT AND HOLD SUBTITLE AND AUTHORS TOO!!!
        const book = { bookId, bookTitle, bookThumbnail }

        // Check if the book is already in the Journal, if not add it to localStorage and update the state
        if(myBooks.some(b => b.bookId === bookId)){
            // Redundancy to check if book is already in the Journal
            alert('This book is already in your Journal')
        } else {
            setMyBooks(prevMyBooks => {
                const updatedBooks = [...prevMyBooks, book]
                localStorage.setItem('books', JSON.stringify(updatedBooks))
                console.log('book added confirmation, change this to some CSS notification')
                return updatedBooks
            })
        }
    }

    const removeBookFromJournal = bookId => {
        const updatedMyBooks = myBooks.filter(book => book.bookId !== bookId)
        setMyBooks(updatedMyBooks)
        localStorage.setItem('books', JSON.stringify(updatedMyBooks))
        localStorage.removeItem(bookId)
    }

    useEffect(() => {
        // Load the books from localStorage to state at the start of the application
        setMyBooks(JSON.parse(localStorage.getItem('books') || '[]'))
    }, [])

    return (
        <JournalContext.Provider value={{
            myBooks,
            setMyBooks,
            addBookToJournal,
            removeBookFromJournal
        }}>
            {props.children}
        </JournalContext.Provider>
    )
}

export { JournalContextProvider, JournalContext }
