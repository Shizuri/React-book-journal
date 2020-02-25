import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Book from './Book'

const BookBrowser = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [bookResults, setBookResults] = useState([])
    const [totalBooksFound, setTotalNoBooksFound] = useState(1)
    const [isSearching, setIsSearching] = useState(false)
    const inputRef = useRef(null)

    const handleSubmit = event => {
        event.preventDefault()
        if (searchTerm.length > 0) {
            setIsSearching(true)
            getBooks(searchTerm)
        }
    }

    const getBooks = term => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=10`)
            .then(function (response) {
                console.log('response: ', response)
                if (response.data.totalItems === 0) {
                    setBookResults([])
                    setTotalNoBooksFound(0)
                    setIsSearching(false)
                } else {
                    setBookResults(response.data.items)
                    setTotalNoBooksFound(response.data.totalItems)
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
            if (totalBooksFound === 0) {
                return <p>No books found for the "{searchTerm}" query.</p>
            }
            return (
                bookResults.map(book => <Book book={book} key={book.id} />)
            )
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='search-box'><i>Search for books by title, authors and ISBN</i></label>
                <br />
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
            {bookOutput()}
        </div >
    )
}

export default BookBrowser