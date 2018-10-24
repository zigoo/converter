import React from "react";

export const Spinner = () => <div className="spinner">Loading</div>;

export const ColoredSpan = ({ value }) =>(
	<span className="text-colored">{value}</span>
);

export const findInList = (list, value) =>
	list.filter(element =>
			element.symbol.toLowerCase().includes(value.toLowerCase()) ||
			element.currencyDescription.toLowerCase().includes(value.toLowerCase())
	);

export const getCurrencyDescription = (list, currencySymbol) => {
	return !!currencySymbol && list.find(cur => cur.symbol === currencySymbol).currencyDescription;
}

export const PanelBlock = (props) => (
	<div {...props}>
		<h4 className="span-as-a-block ellipsis">{props.title}</h4>
		<div className="flex-wrap">
			{props.children}
		</div>
	</div>
);
