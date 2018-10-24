import {
	BATCH_ACTIONS,
	FETCH_START,
	FETCH_FINISH,
	FETCH_CURRENCIES_ERROR,
	FETCH_CURRENCIES_SUCCESS,
	FETCH_SYMBOLS_SUCCESS
} from "./types.js";

const initialState = {
	currenciesLoaded: false,
	error: false
};

export const enableBatchActions = reducer => {
	return function batchingReducer(state = initialState, action) {
		if (action.type === BATCH_ACTIONS) {
			return action.actions.reduce(reducer, state);
		}

		return reducer(state,action)
	};
};

const mainReducer = (state = initialState, action) => {
	if (action.type === FETCH_START) {
			return { ...state, loading: true }
	}

	if (action.type === FETCH_FINISH) {
		return { ...state, loading: false }
	}

	if (action.type === FETCH_CURRENCIES_SUCCESS) {
		return {
			...state,
			currenciesLoaded: true,
			currencies: [{
				...action.rates,
				baseCurrency: action.base
			}]
		};
	}

	if (action.type === FETCH_SYMBOLS_SUCCESS) {
		const symbols = Object.keys(action.symbols);
		const currencyDescription = Object.values(action.symbols);

		const iterableCurrencies = symbols.map((sym, ndx) => {
			return {
				id: ndx,
				symbol: sym,
				currencyDescription: currencyDescription[ndx]
			}
		});

		return { ...state, symbols: iterableCurrencies };
	}

	if (action.type === FETCH_CURRENCIES_ERROR) {
		return {
			error: true
		}
	}

	return state;
};

export default enableBatchActions(mainReducer);
