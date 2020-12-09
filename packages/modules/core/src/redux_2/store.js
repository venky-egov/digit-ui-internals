import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { DUMMY_ACTION } from "./types";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const middleware = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const commonReducer = (state = {}, action) => {
  switch (action.type) {
    case DUMMY_ACTION:
      return { ...state, common_property: action.payload };

    default:
      return state;
  }
};

class StoreApi {
  constructor() {
    this._reducers = { core: commonReducer };
    this._reducer_states = {};
    const middleware = [thunk];
    this.store = createStore(combineReducers(this._reducers), enhancer);
    this.store.subscribe(this.onStateChange);
    this.dispatch = this.store.dispatch;
  }

  onStateChange = () => {
    this._reducer_states = this.store.getState();
  };

  addReducer = (name, reducerFunction) => {
    if (!this._reducers[name]) {
      this._reducers[name] = reducerFunction;
      this.store.replaceReducer(combineReducers(this._reducers));
    }
  };
}

export class StoreSingleton {
  constructor() {
    if (!StoreSingleton.instance) {
      StoreSingleton.instance = new StoreApi();
    }
  }
  getInstance = () => StoreSingleton.instance;
  addReducer = (name, reducerFunction) => this.getInstance().addReducer(name, reducerFunction);
  dispatch = (action) => this.getInstance().dispatch(action);
  state = () => this.getInstance()._reducer_states;
}
