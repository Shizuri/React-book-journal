// This component lists prints the books in the users journal.
import React, { useContext, useEffect, useState } from 'react'
import { JournalContext } from './journalContext'
import { ScrollContext } from './scrollContext'
import JournalEntry from './JournalEntry'
import './Journal.css'
import magnifyingGlass from './images/search-magnifying-glass-png-7-transparent-small.png'

const Journal = props => {
    const { myBooks } = useContext(JournalContext) // myBooks contains bookId, bookTitle, bookThumbnail, bookAuthors and bookSubtitle
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredBooks, setFilteredBooks] = useState([])

    // This provides and setts the scroll location for this component
    const { journalScrollPosition, setJournalScrollPosition } = useContext(ScrollContext)

    // Could be left as just a cosmetic non-button, but this way the functionality is maintained
    const handleSubmit = event => {
        event.preventDefault()
        handleChange(searchTerm)
    }

    // Filtering the Journal Entries by book title or authors 
    const handleChange = value => {
        setSearchTerm(value)
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

    // When this component is loaded myBooks is an empty array. This is because in journalContext, myBooks is asynchronously updated.
    // This is because it uses React Set State that is an asynchronous function. So once myBooks filled, filteredBooks will be set to it.
    useEffect(() => {
        setFilteredBooks(myBooks)
    }, [myBooks, setFilteredBooks])

    // Setting the scroll position
    useEffect(() => {
        // When the component is mounted, set the window position from state
        window.scrollTo(0, journalScrollPosition)

        return () => {
            // When the component is unmounting, set the scroll position to state
            setJournalScrollPosition(window.pageYOffset)
        }
    }, [journalScrollPosition, setJournalScrollPosition])

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