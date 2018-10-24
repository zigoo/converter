import React, { Component } from "react";
import CurrencyPicker from "./CurrencyPicker.js";
import AmountInput from "./AmountInput.js";
import {
	ColoredSpan,
	PanelBlock,
	Spinner,
	getCurrencyDescription
} from "./helpers";

class Converter extends Component {
	state = {
		currencyExchangeFrom: null,
		currencyExchangeTo: null,
		result: null
	};

	setCurrencyExchangeFrom = currencyExchangeFrom =>
		this.setState({ currencyExchangeFrom, result: null  });

	setCurrencyExchangeTo = currencyExchangeTo =>
		this.setState({ currencyExchangeTo, result: null  });

	setAmountFrom = amountFrom =>
		this.setState({ amountFrom, result: null });

	convertCurrencies = () => {
		const { amountFrom, currencyExchangeFrom, currencyExchangeTo } = this.state;

		this.props.currencyConversion(currencyExchangeFrom,currencyExchangeTo)
			.then(res => {
				const scaler = Object.values(res.data);
				const totalValue = scaler * amountFrom;
				const valueFixed = parseFloat(totalValue.toFixed(2));

				this.setState({ result: valueFixed });
			});
	};

	render() {
		const { symbols } = this.props;
		const baseCurrencyDescription = getCurrencyDescription(symbols, this.state.currencyExchangeFrom);
		const targetCurrencyDescription = getCurrencyDescription(symbols, this.state.currencyExchangeTo);

		return (
			<div>
				<h3 className="text-center">Currency converter</h3>
				<div className="main-wrapper">
					<div className="currency-picker-panel">
						<PanelBlock title="Pick your base currency and amount">
							<AmountInput>{amount => this.setAmountFrom(amount)}</AmountInput>
							<CurrencyPicker list={symbols}>
								{selectedSymbol =>
									this.setCurrencyExchangeFrom(selectedSymbol)}
							</CurrencyPicker>
						</PanelBlock>
					</div>
					<div className="currency-picker-panel">
						<PanelBlock title="Convert to">
							<CurrencyPicker list={symbols}>
								{selectedSymbol =>
									this.setCurrencyExchangeTo(selectedSymbol)}
							</CurrencyPicker>
							<button className="convert-button" onClick={() => this.convertCurrencies()}>
								Convert
							</button>
						</PanelBlock>
					</div>
				</div>
				{
					!!this.state.result && (
						<div className="text-center result">
							<ColoredSpan value={this.state.amountFrom} />{baseCurrencyDescription}'s gives you{" "}
							<ColoredSpan value={this.state.result} /> {targetCurrencyDescription}'s
						</div>)
				}
			</div>
		);
	}
}

export default Converter;