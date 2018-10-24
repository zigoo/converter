import React from 'react';
import ReactDOM from 'react-dom';
import Converter from './Components/Converter.container.js';

import thunk from "redux-thunk";
import mainReducer from "./Redux/reducer.js";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import './Styles/index.css';
import "./Styles/currencypicker.css";

const storeWithMiddleware = applyMiddleware(thunk)(createStore);
const store = storeWithMiddleware(mainReducer, composeWithDevTools());

ReactDOM.render(
	<Provider store={store}>
		<Converter />
	</Provider>, document.getElementById("root"));
