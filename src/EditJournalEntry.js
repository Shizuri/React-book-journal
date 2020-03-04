import React from 'react'
import { useHistory } from 'react-router-dom'

const EditJournalEntry = props => {
    const history = useHistory() // Browsing history provided by react-router

    return (
        <div>
            <button onClick={history.goBack}>Back to Journal Entry</button>
            BLAH!
        </div>
    )
}

export default EditJournalEntry