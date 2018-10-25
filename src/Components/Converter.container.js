import Converter from "./Converter.js";
import { Spinner } from "./helpers";

import { fetchCurrencies, currencyConversion} from "../Redux/actions.js";
import { branch, compose, lifecycle, renderComponent } from "recompose";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  currenciesLoaded: state.currenciesLoaded,
  symbols: state.symbols,
  currencies: state.currencies,
  error: state.error
});

const branchedEnchancer = branch(
  props => props.currenciesLoaded,
  f => f,
  renderComponent(Spinner)
);

export default compose(
  connect(mapStateToProps,{
    fetchCurrencies,
    currencyConversion
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchCurrencies();
    }
  }),
  branchedEnchancer
)(Converter);
