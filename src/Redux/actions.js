import axios from "axios";
import {
	BATCH_ACTIONS,
	FETCH_CURRENCIES_ERROR,
	FETCH_CURRENCIES_SUCCESS,
	FETCH_SYMBOLS_SUCCESS,
} from "../Redux/types.js";

export const batchActions = (...actions) => ({
	type: BATCH_ACTIONS,
	actions: actions
});

export const fetchCurrencies = () => dispatch =>
	Promise.all([
		axios.get(`http://data.fixer.io/api/latest?access_key=d675e38f30acd331e450957954b43db4` ),
		axios.get(`http://data.fixer.io/api/symbols?access_key=d675e38f30acd331e450957954b43db4` )
	])
	.then(([latestResponse, symbolResponse]) => {

		return dispatch(
			batchActions(
				{ type: FETCH_CURRENCIES_SUCCESS, ...latestResponse.data },
				{ type: FETCH_SYMBOLS_SUCCESS, ...symbolResponse.data }
			)
		);
	})
	.catch(err => dispatch({ type: FETCH_CURRENCIES_ERROR }));


export const currencyConversion = (...data) => () => {
	const [ currencyBase, currencyDest ] = data;

 // wont work on free acoount :(
 //	axios.get(`http://data.fixer.io/api/convert?access_key=d675e38f30acd331e450957954b43db4&from=${currencyBase}&to=${currencyDest}&amount=${amount}`)
 	return axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${currencyBase}_${currencyDest}&compact=ultra`);
}