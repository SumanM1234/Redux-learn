const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

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

function orderIceCream() // Action creator function
{
  return {
    type: ICECREAM_ORDERED, // 'Action' with 'type' property
    quantity: 1,
  }
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  }
}


// Reducer: (previousState, action) => newState

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// }

const initialCakeState = {
  numOfCakes: 10,
}

const initialIceCreamState = {
  numOfIceCreams: 20,
}

const cakeReducer = (state = initialCakeState, action) => {   // action is orderCake(), restockCake()
    switch (action.type) {
      case CAKE_ORDERED:
        return {
          ...state, // making copy of the initialState & updating the required property/properties
          numOfCakes: state.numOfCakes - 1,
        }
      case CAKE_RESTOCKED:
        return {
          ...state,
          numOfCakes: state.numOfCakes + action.payload,
        }
      default:
        return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  // action is orderCake(), restockCake()
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

const store = createStore(rootReducer)   // First line of execution & store is created
console.log('Initial state : ', store.getState())
// console.log('Initial state : ', store.getState().cake.numOfCakes) // Only accessing numOfCakes property from the rootReducer
const unsubscribe = store.subscribe(() =>
  // Listener gets called anytime the store updates
  console.log("Updated state : ", store.getState())
  // console.log("Updated state : ", store.getState().cake.numOfCakes)
)

// store.dispatch(orderCake())  // Action is added to the reducer & the state gets updated with the new state
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)  
// Provide the list of functions as the fist argument & provide the store dispatch 
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(2)

unsubscribe()  //Listener unsubscribed & after this the store won't get updated