// This component lists prints the books in the users journal.
import React, { useContext, useEffect } from 'react'
import { JournalContext } from './journalContext'
import JournalEntry from './JournalEntry'
import './Journal.css'
import magnifyingGlass from './images/search-magnifying-glass-png-7-transparent-small.png'

const Journal = props => {
    // myBooks contains bookId, bookTitle, bookThumbnail, bookAuthors and bookSubtitle
    // Keeping all of the state in journalContext provides a smooth experience when changing routes and no unneeded re-renders.
    const { myBooks, searchTerm, setSearchTerm, filteredBooks, setFilteredBooks } = useContext(JournalContext)

    // Just a cosmetic non-button.
    const handleSubmit = event => {
        event.preventDefault()
    }

    const handleChange = value => {
        setSearchTerm(value)
        // Filtering the Journal Entries by book title or authors 
        setFilteredBooks(prevFilteredBooks => {
            return (
                myBooks.filter(
                    book => {
                        return (
                            // Filter by title
                            (book.bookTitle.toLowerCase().includes(value.toLowerCase()))
                            ||
                            // Filter by author
                            (book.bookAuthors ? book.bookAuthors.some(author => author.toLowerCase().includes(value.toLowerCase())) : false)
                        )
                    }
                )

            )
        })
    }

    // Setting the document title
    useEffect(() => {
        document.title = 'Journal'
    }, [])

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