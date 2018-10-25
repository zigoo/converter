import React from 'react';
import ReactDOM from 'react-dom';
import Converter from './Components/Converter.container.js';

import thunk from "redux-thunk";
import mainReducer from "./Redux/reducer.js";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

import './Styles/index.css';
import "./Styles/currencypicker.css";

const persistConfig = {
  key: 'root',
  storage
}


const storeWithMiddleware = applyMiddleware(thunk)(createStore);
const persistedReducer = persistReducer(persistConfig, mainReducer);
const store = storeWithMiddleware(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<Converter />
		</PersistGate>
	</Provider>, document.getElementById("root"));
