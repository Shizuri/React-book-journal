// This is a display component used in the Journal compomnent to display the books in the Journal.
import React from 'react'
import { Link } from 'react-router-dom'

const JournalEntry = props => {
    return (
        <div style={{ border: '1px solid teal', width: '80%', margin: '0px auto 10px', backgroundColor: 'pink' }}>
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