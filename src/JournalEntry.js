// This is a display component used in the Journal compomnent to display the books in the Journal.
import React from 'react'
import { Link } from 'react-router-dom'
import './JournalEntry.css'
import useFormatAuthors from './hooks/useFormatAuthors'

const JournalEntry = props => {
    // Formating needed if authors are missing or if there is more than one.
    const authors = useFormatAuthors(props.book.bookAuthors)

    return (
        <div className='Journal-entry'>
            <Link to={`journal/${props.book.bookId}`} className='Journal-entry-link'>
                <div className='Journal-entry-container'>
                    <img src={props.book.bookThumbnail} alt={props.book.bookTitle} />
                    <h2>{props.book.bookTitle}</h2>
                    {props.book.bookSubtitle && <span className='Journal-entry-subtitle'>{props.book.bookSubtitle}</span>}
                    {authors}
                </div>
            </Link>
        </div>
    )
}

export default JournalEntry