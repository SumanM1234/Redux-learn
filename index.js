const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

function orderCake () // Action creator function
{
    return {
        type: CAKE_ORDERED,  // 'Action' with 'type' property 
        quantity: 1,
    }
}

function restockCake(qty = 1)
{
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

// Reducer: (previousState, action) => newState

const initialState = {
    numOfCakes: 10,
    anotherProperty: 0,
}

const reducer = (state = initialState, action) => {   // action is orderCake(), restockCake()
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,  // making copy of the initialState & updating the required property/properties
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
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

// store.dispatch(orderCake())  // Action is added to the reducer & the state gets updated with the new state
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({orderCake, restockCake}, store.dispatch)  
// Provide the list of functions as the fist argument & provide the store dispatch 
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

unsubscribe()  //Listener unsubscribed & after this the store won't get updated