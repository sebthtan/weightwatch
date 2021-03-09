import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { searchWorkouts } from '../../store/search'


const SearchPage = () => {
    const useQuery = () => new URLSearchParams(useLocation().search)
    const dispatch = useDispatch()
    const results = useSelector(state => state.search.results)

    let query = useQuery()
    let term = query.get('name')

    useEffect(() => {
        dispatch(searchWorkouts(term))
    }, [dispatch, term])

    return (
        results && (
            <div className='text-gray-300'>
                <h2>Hello from Search Page</h2>
                <h2>{term}</h2>
            </div>
        )
    )
}

export default SearchPage
