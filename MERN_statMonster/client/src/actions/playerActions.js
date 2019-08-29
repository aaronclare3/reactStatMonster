import { GET_PLAYERS, ADD_PLAYER, DELETE_PLAYER, PLAYERS_LOADING, GET_PLAYER } from './types';
import axios from 'axios';


export const getPlayers = () => dispatch => {
    dispatch(setPlayersLoading());
    axios
        .get('/api/players')
        .then(res => 
            dispatch({
                type: GET_PLAYERS,
                payload: res.data
            })
        )
    };

export const addPlayer = (player) => dispatch => {
    axios.post('/api/players', player)
        .then(res => 
            dispatch({
                type: ADD_PLAYER,
                payload: res.data
        })
    )
};


export const deletePlayer = (id) => dispatch => {
    axios.delete(`/api/players/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_PLAYER,
                payload: id
        })
    )
}

export const getPlayer = (id) => dispatch => {
    dispatch(setPlayersLoading());
    axios.get(`/api/players/${id}`)
        .then(res => 
            dispatch({
                type: GET_PLAYER,
                payload: res.data
        })
    )
}

export const setPlayersLoading = () => {
    return {
        type: PLAYERS_LOADING
    }
}