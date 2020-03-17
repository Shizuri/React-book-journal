// This is a display component used in the Journal compomnent to display the books in the Journal.
import React from 'react'
import { Link } from 'react-router-dom'
import './JournalEntry.css'

const JournalEntry = props => {
    // Formating needed if authors are missing or if there is more than one.
    const authors = () => {
        if (!props.book.bookAuthors) {
            return <span>by <span className='Journal-entry-author'>unknow author</span></span>
        } else if (props.book.bookAuthors.length === 1) {
            return <span>by <span className='Journal-entry-author'>{props.book.bookAuthors[0]}</span></span>
        } else {
            return (
                <span>
                    by {props.book.bookAuthors.map((author, i) => <span key={author}>
                    <span className='Journal-entry-author'>{author}{i + 1 === props.book.bookAuthors.length ? ' ' : ','} </span>
                </span>)}
                </span>
            )
        }
    }

    return (
        <div className='Journal-entry'>
            <Link to={`journal/${props.book.bookId}`} className='Journal-entry-link'>
                <div className='Journal-entry-container'>
                    <img src={props.book.bookThumbnail} alt={props.book.bookTitle} />
                    <h2>{props.book.bookTitle}</h2>
                    {props.book.bookSubtitle && <span className='Journal-entry-subtitle'>{props.book.bookSubtitle}</span>}
                    {authors()}
                </div>
            </Link>
        </div>
    )
}

export default JournalEntry