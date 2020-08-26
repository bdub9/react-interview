import axios from 'axios'
import { act } from 'react-dom/test-utils'

const API_KEY = '31ef1c7f381833b746b8e72899a2396d'
const BASE_URL = `https://gateway.marvel.com/v1/public/comics?apikey=${API_KEY}`

export const actionTypes = {
    fetchAll: 'FETCH_ALL',
    fetchSearch: 'FETCH_SEARCH',
    fetching: 'fetching',
}


export const actions = {
    fetchAll: () => async (dispatch) => {
        dispatch({ type: actionTypes.fetching })
        const response = await axios.get(BASE_URL)
        const comics = response.data.data.results
        
        dispatch({
            type: actionTypes.fetchAll,
            comics,
        })
    },
    fetchSearch: (text) => async (dispatch) => {
        dispatch({ type: actionTypes.fetching })
        const response = await axios.get(`${BASE_URL}&title=${text}`)
        const comics = response.data.data.results
        dispatch({
            type: actionTypes.fetchSearch,
            comics,
        })
    },
}

const INITIAL_STATE = {
    items: [],
    loading: true,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case (actionTypes.fetching): {
            return {
                ...state,
                loading: true,
            }
        }
        case (actionTypes.fetchAll):
        case (actionTypes.fetchSearch):
            return {
                items: action.comics,
                loading: false,
            }
        default:
            return state
    }
}