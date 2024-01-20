const redux = require('redux');
const createStore = redux.createStore;

const CAKE_ORDERED = 'CAKE_ORDERED'

function orderCake () // Action creator function
{
    return {
        type: CAKE_ORDERED,  // 'Action' with 'type' property 
        quantity: 1,
    }
}

// Reducer: (previousState, action) => newState

const initialState = {
    numOfCakes: 10,
    anotherProperty: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,  // making copy of the initialState & updating the required property/properties
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

const store = createStore(reducer)   // First line of execution & store is created
console.log('Initial state : ', store.getState())

const unsubscribe = store.subscribe(() =>    // Listener gets called anytime the store updates
  console.log("Updated state : ", store.getState())
)

store.dispatch(orderCake())  // Action is added to the reducer & the state gets updated with the new state
store.dispatch(orderCake())
store.dispatch(orderCake())

unsubscribe()  //Listener unsubscribed & after this the store won't get updated