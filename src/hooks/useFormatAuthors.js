import React from 'react'

// Formatting authors they are missing or if there is more than one.
// This is used as a hook because the same logic is needed in Book.js and JournalEntry.js
const useFormatAuthors = authors => {
    if (!authors) {
        return <span>by <span className='Book-author'>unknow author</span></span>
    } else if (authors.length === 1) {
        return <span>by <span className='Book-author'>{authors[0]}</span></span>
    } else {
        return (
            <span>
                by {authors.map((author, i) => <span key={author}>
                <span className='Book-author'>{author}{i + 1 === authors.length ? ' ' : ','} </span>
            </span>)}
            </span>
        )
    }
}

export default useFormatAuthors