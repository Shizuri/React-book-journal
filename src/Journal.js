// This component lists prints the books in the users journal.
import React, { useContext, useEffect } from 'react'
import { JournalContext } from './journalContext'
import { ScrollContext } from './scrollContext'
import JournalEntry from './JournalEntry'
import './Journal.css'
import magnifyingGlass from './images/search-magnifying-glass-png-7-transparent-small.png'

const Journal = props => {
    // In this component most of the logic is kept in the journalContext.
    // This way it is available in other components that need it.
    const { myBooks, searchTerm, filterBooks, filteredBooks } = useContext(JournalContext)

    // // This provides and setts the scroll location for this component
    const { journalScrollPosition, setJournalScrollPosition } = useContext(ScrollContext)

    // Just a cosmetic non-button
    const handleSubmit = event => {
        event.preventDefault()
    }

    useEffect(() => {
        // Setting the document title
        document.title = 'Journal'
    }, [])

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
                                    onChange={event => filterBooks(event.target.value)}
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