import React, { Component } from "react";

class AmountInput extends Component {
	constructor(){
		super();
			this.amountInput = React.createRef();
			this.state = { pickerValue: "" };
	} 

	componentDidMount() {
		this.amountInput.current.focus();
	}

	clearPicker = () =>
		this.setState({ pickerValue: "" });

	handlePickerValue = pickerValue =>
		this.setState({ pickerValue });

	render() {
		const { pickerValue } = this.state;

		return (
			<div className="amount-picker">
				<div className="amount-picker-input">
					<input
						id="amountPicker"
						ref={this.amountInput}
						type="number"
						value={pickerValue}
						onChange={ev => this.handlePickerValue(ev.target.value)}
						onBlur={()=> this.props.children(pickerValue)}
						placeholder="amount"
					/>
					{!!pickerValue && <span onClick={()=> this.clearPicker()}>x</span>}
				</div>
			</div>
		);
	}
}

export default AmountInput;
