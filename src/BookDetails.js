import React from 'react'
import { useParams } from 'react-router-dom'

const BookDetails = props => {
    let { bookId } = useParams()
    return (
        <div>
            Book Details
            <p>{bookId}</p>
        </div>
    )
}

export default BookDetails

// Component to show all of the details about a book once it is clicked in the list of queried books