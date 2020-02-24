import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const FindBook = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [noBooksFound, setNoBooksFound] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const inputRef = useRef(null)

    const handleSubmit = event => {
        event.preventDefault()
        setIsSearching(true)
        getBooks(searchTerm)
    }

    const getBooks = term => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=10`)
            .then(function (response) {
                console.log('response: ', response)
                if (response.data.totalItems === 0) {
                    setSearchResults([])
                    setNoBooksFound(true)
                    setIsSearching(false)
                } else {
                    setSearchResults(response.data.items)
                    setNoBooksFound(false)
                    setIsSearching(false)
                }
            })
            .catch(function (error) {
                setIsSearching(false)
                console.log('Error!: ', error)
            })
            .then(function () {
                // console.log('this will always execute')
            })
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const bookOutput = () => {
        if (isSearching) {
            return <p>Searching...</p>
        } else {
            if (noBooksFound) {
                return <p>No books found for the "{searchTerm}" query.</p>
            }
            return (
                searchResults.map((book, index) =>
                <div key={book.id}>
                    <span>{index + 1}: {book.volumeInfo.title} - {
                        book.volumeInfo.subtitle ? book.volumeInfo.subtitle : 'NO SUBTITLE'} <b>by</b> {
                            book.volumeInfo.authors ? book.volumeInfo.authors.map(author => author) : 'NO'}</span>
                            {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} /> : <b>NO IMAGE!</b>}
                </div>)
            )
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='search-bar'
                    placeholder='Search for a book'
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    ref={inputRef}
                />
                <button>Search</button>
            </form>
            <hr />
            {bookOutput()}
        </div >
    )
}

export default FindBook