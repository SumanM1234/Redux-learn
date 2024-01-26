const redux = require('redux');
const produce = require('immer').produce;

const initialState = {
    name: 'Suman',
    address: {   // nested state
        street: '123 ABC Street',
        city: 'Panjim',
        state: 'Goa'
    },
}

const STREET_UPDATED = 'STREET_UPDATED'
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     },
            // }

            // Using immer to handle immutable data structures
            return produce (state, (draft) => {  // produce ( state, function to update state())
                draft.address.street = action.payload
            })
        default: {
            return state
        }
    }
}

const store = redux.createStore(reducer);
console.log('Initial state : ', store.getState())

const unsubscribe = store.subscribe(() => {
    console.log('Updated state : ', store.getState())
})

store.dispatch(updateStreet('321 CBA Street'));
unsubscribe();