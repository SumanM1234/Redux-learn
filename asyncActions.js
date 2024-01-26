const redux = require('redux');

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCEEDED = 'FETCH_USERS_SUCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCEEDED,
        payload: users,
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
    }
}

const store = redux.createStore(reducer);