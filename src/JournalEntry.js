// This is a display component used in the Journal compomnent to display the books in the Journal.
import React from 'react'
import { Link } from 'react-router-dom'
import './JournalEntry.css'

const JournalEntry = props => {
    return (
        <div className='Journal-entry'>
            <Link to={`journal/${props.book.bookId}`}>
                <div>
                    <span>{props.book.bookTitle}</span>
                    <img src={props.book.bookThumbnail} alt={props.book.bookTitle} />
                </div>
            </Link>
        </div>
    )
}

export default JournalEntry