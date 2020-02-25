import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Book from './Book'

const BookBrowser = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [bookResults, setBookResults] = useState([])
    const [totalBooksFound, setTotalNoBooksFound] = useState()
    const [isSearching, setIsSearching] = useState(false)
    const [loadedBooksIndex, setLoadedBooksIndex] = useState(0)
    const [isLoadingMoreBooks, setIsLoadingMoreBooks] = useState(false)
    const inputRef = useRef(null)

    const handleSubmit = event => {
        event.preventDefault()
        if (searchTerm.length > 0) {
            setIsSearching(true)
            getBooks(searchTerm)
        }
    }

    const getBooks = term => {
        const maxResults = 10
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=${maxResults}`)
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
                    if(response.data.totalItems < 10){
                        setLoadedBooksIndex(response.data.totalItems)
                    } else {
                        setLoadedBooksIndex(maxResults)
                    }
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

    const loadMoreBooks = () => {
        const maxResults = 10
        setIsLoadingMoreBooks(true)

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${maxResults}&startIndex=${loadedBooksIndex}`)
            .then(function (response) {
                console.log('response of loading more: ', response)
                if (response.data.items === undefined) {
                    setIsLoadingMoreBooks(false)
                } else {
                    setBookResults(prevBookResults => [...prevBookResults, ...response.data.items])
                    setIsLoadingMoreBooks(false)
                    setLoadedBooksIndex(prevIndex => prevIndex + response.data.items.length)
                }
            })
            .catch(function (error) {
                setIsLoadingMoreBooks(false)
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
            {totalBooksFound > 0 ? <button onClick={loadMoreBooks}>Load More Books</button> : null}
        </div >
    )
}

export default BookBrowser