import { GET_PLAYERS, ADD_PLAYER, DELETE_PLAYER, PLAYERS_LOADING, GET_PLAYER } from './types';
import axios from 'axios';
import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';


export const getPlayers = () => dispatch => {
    dispatch(setPlayersLoading());
    axios
        .get('/api/players')
        .then(res => 
            dispatch({
                type: GET_PLAYERS,
                payload: res.data
            })
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    };

export const addPlayer = (player) => (dispatch, getState) => {
    axios.post('/api/players', player, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_PLAYER,
                payload: res.data
        })
    ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const deletePlayer = (id) => (dispatch, getState) => {
    axios.delete(`/api/players/${id}`, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: DELETE_PLAYER,
                payload: id
        })
    ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
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