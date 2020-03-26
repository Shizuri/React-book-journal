// This component lists prints the books in the users journal.
import React, { useContext, useEffect, useState } from 'react'
import { JournalContext } from './journalContext'
import JournalEntry from './JournalEntry'
import './Journal.css'
import magnifyingGlass from './images/search-magnifying-glass-png-7-transparent-small.png'

const Journal = props => {
    const { myBooks } = useContext(JournalContext) // myBooks contains bookId, bookTitle, bookThumbnail
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredBooks, setFilteredBooks] = useState([])

    const handleSubmit = event => {
        event.preventDefault()
        handleChange(searchTerm)
    }

    const handleChange = value => {
        setSearchTerm(value)
        setFilteredBooks(prevFilteredBooks => {
            // List all books if there is no search term.
            // Necessary to prevent crash by book.bookAuthors.some()
            if (value === '') {
                return myBooks
            }
            return (
                myBooks.filter(
                    // Filter by title
                    book => book.bookTitle.toLowerCase().includes(value.toLowerCase())
                    // Filter by author
                        // || book.bookAuthors ? book.bookAuthors.some(author => author.toLowerCase().includes(value.toLowerCase())) : false
                )

            )
        })
    }

    useEffect(() => {
        document.title = 'Journal'
    }, [])

    useEffect(() => {
        setFilteredBooks([...myBooks])
    }, [myBooks])



    return (
        <div className='Journal'>
            {
                myBooks.length === 0 ?
                    <p className='Journal-intro'>Add some books to your Journal from the Book Browser</p> :
                    <>
                        <div className='Journal-intro'>Books in your Journal</div>
                        <div className='Journal-search-form-container'>
                            <form onSubmit={handleSubmit} className='Journal-search-form'>
                                <input
                                    type='text'
                                    name='search-bar'
                                    placeholder='Filter books'
                                    value={searchTerm}
                                    onChange={event => handleChange(event.target.value)}
                                    className='Journal-search-bar'
                                />
                                <button className='Journal-search-button'><img src={magnifyingGlass} alt='magnifying glass' /></button>
                            </form>
                        </div>
                        {filteredBooks.map(book => <JournalEntry book={book} key={book.bookId} />)}
                    </>
            }
        </div >
    )
}

export default Journal