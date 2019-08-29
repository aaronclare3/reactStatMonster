import uuid from 'uuid';
import { GET_PLAYERS, ADD_PLAYER, DELETE_PLAYER, PLAYERS_LOADING, GET_PLAYER } from '../actions/types';

const initialState = {
    players: [],
    loading: false
};


export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PLAYERS:
            return {
                ...state,
                players: action.payload,
                loading: false 
            };
        case DELETE_PLAYER:
            return {
                ...state,
                players: state.players.filter(player => player._id !== action.payload)
            };
        case ADD_PLAYER:
            return {
                ...state,
                players: [action.payload, ...state.players]
            };
        case PLAYERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PLAYER:
            return {
                ...state,
                players: action.payload,
                loading: false
            };
        default:
            return state;

    }
}