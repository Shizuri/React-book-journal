import React from 'react'
import { Link } from 'react-router-dom'

const JournalEntry = props => {
    return (
        <div style={{ border: '1px solid teal', width: '80%', margin: '0px auto 10px', backgroundColor: 'pink' }}>
            <Link to={{
                // Send the pathname and the book information to the clicked link
                pathname: `journal/${props.book.bookId}`,
                state: {
                    book: props.book
                }
            }}>
                <div>
                    <span>{props.book.bookTitle}</span>
                    <img src={props.book.bookThumbnail} alt={props.book.bookTitle} />
                </div>
            </Link>
        </div>
    )
}

export default JournalEntry