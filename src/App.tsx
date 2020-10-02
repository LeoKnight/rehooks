import React  from 'react';
import useCombinedReducers from './hooks/use-combined-reducers';
const { createContext, useReducer } = React
function CounterViewer() {
  const {counter} = React.useContext(StoreContext);
  return <div>current counter :{counter.counter}</div>;
}

function CounterOperator() {
  const dispatch = React.useContext(DispatchContext);
  
  const increase = ()=>{
    dispatch({
      type: 'increase'
    })
  }

  const decrease =()=>{
    dispatch({
      type: 'decrease'
    })
  }

  return (
    <div>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

interface AppProps {}

function App({}: AppProps) {
  const [store, dispatch] = useCombinedReducers({
    counter: useReducer(counterReducer, initialStore),
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={store}>
        <div>
          <CounterViewer/>
          <CounterOperator/>
        </div>
      </StoreContext.Provider>
    </DispatchContext.Provider>
  );
}

const initialStore = {
  counter: 0,
};
function counterReducer(state: any, action: any) {
  switch (action.type) {
    case 'increase':
      return { ...state, counter: state.counter + 1 };
    case 'decrease':
      return { ...state, counter: state.counter - 1 };
    default:
      throw new Error();
  }
}

export const DispatchContext = createContext({});
export const StoreContext = createContext({});

export default App;
