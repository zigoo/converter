import React, { Component } from "react";
import { KEYCODE_ESC } from "../Redux/types.js"
import { findInList } from "./helpers";
import { debounce } from "throttle-debounce";

class CurrencyPicker extends Component {
	state = { dropdownOpen: false, pickerValue: "" };
		
	hideDropdownVisibility = debounce(100, () =>
		this.setState({ dropdownOpen: false }))

	handleBlur = () =>
		this.hideDropdownVisibility();

	showDropdownVisibility = value =>
		this.setState({ dropdownOpen: true });

	changeSelected = (ev, curr ) =>
		this.setState({ pickerValue: curr.symbol, dropdownOpen: false }, () => {
			this.props.children(curr.symbol);
		});
	
	clearPicker = () =>
		this.setState({ pickerValue: "" });
	
	handlePickerValue = pickerValue =>
		this.setState({ pickerValue });
	
	handleKeyPress = event => {
		if (event.which === KEYCODE_ESC) {
			this.hideDropdownVisibility();
		}
	}

	render() {
		if (this.props.list === undefined) {
			return null;
		}

		const { pickerValue, dropdownOpen } = this.state;
		const classEnchancer = dropdownOpen ? "open" : "";
		const currencies = findInList(this.props.list, pickerValue);
		
		return (
			<div
				className={`currency-selector-wrapper ${classEnchancer}`}
				onFocus={this.showDropdownVisibility}
				onBlur={this.handleBlur}
			>
				<div className="currency-picker-input">
					<input
						id="currencyPicker"
						ref={this.input}
						value={pickerValue}
						onChange={ev => this.handlePickerValue(ev.target.value)}
						onKeyDown={(ev) => this.handleKeyPress(ev)}
						placeholder="pick from list or start typing"
					/>
					{!!pickerValue && <span onClick={()=> this.clearPicker()}>x</span>}
				</div>
				{currencies.length > 0
					? (
							<ul className="currency-selector">
								{currencies.map(currency => (
									<li key={currency.symbol} className="currency-selector" onClick={(ev) => this.changeSelected(ev, currency)}>
										<span className="currency-selector-align_left ellipsis">{currency.currencyDescription}</span>
										<span className="currency-selector-align_right">{currency.symbol}</span>
									</li>
								))}
							</ul>
						)
					: (
							<div className="text-center color-salmon">
								Nie znaleziono takiej waluty
						  </div>
					   )
				}
			</div>
		);
	}
}

export default CurrencyPicker;
