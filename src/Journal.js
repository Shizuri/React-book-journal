import React, { useContext } from 'react'
import { JournalContext } from './journalContext'
import { Link } from 'react-router-dom'

const Journal = props => {
    const { myBooks } = useContext(JournalContext) // myBooks contains bookId, bookTitle, bookThumbnail

    return (
        <div>
            <h1>Journal Component</h1>
            <button onClick={() => localStorage.setItem("books", [])}>Remove all books from Local Storage</button>
            <button onClick={() => console.log(localStorage.getItem("books"))}>Show localStorage</button> {/* eventually delete this line */}
            {myBooks.map(book =>
                <Link to={{
                    // Send the pathname and the book information to the clicked link
                    pathname: `journal/${book.bookId}`,
                    state: {
                        book
                    }
                    }} key={book.bookId}>
                    <div style={{ border: '1px solid teal', width: '80%', margin: '0px auto 10px' }}>
                        <span>{book.bookTitle}</span>
                        <img src={book.bookThumbnail} alt={book.bookTitle} />
                    </div>
                </Link>
            )}
        </div>
    )
}

export default Journal