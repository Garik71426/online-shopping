import React from 'react';
import axios from 'axios';
import { Button, DropdownToggle, DropdownMenu, DropdownItem,
    Input, InputGroup, InputGroupButtonDropdown, InputGroupAddon,
    Alert, Spinner
} from 'reactstrap';
import PropTypes from 'prop-types';

class Result extends React.Component {
    state = {
        dropdownOpen: false,
        splitButtonOpen: false,
        prices: {},
        loading: false,
        currencies: []
    };
    componentDidMount(){
        this.getCurrrencies();
    }
    componentDidUpdate (prevProps) {
        if (prevProps.basketCount !== this.props.basketCount) {
            this.setState({ prices: {} });
        }
    };
    toggleSplit = () => {
        this.setState({
            splitButtonOpen: !this.state.splitButtonOpen
        });
    };
    getCurrrencies = () => {
        axios.get('http://localhost:3001/currencies')
        .then(res => {
            this.setState({ currencies: res.data });
        })
        .catch(err => {
            alert(err);
        });
    };
    getValutes = (result) => {
        !this.state.prices.RUB || this.state.prices.RUB !== result? 
        axios.get(`http://localhost:3001/Valutes/${result}`)
        .then(res => {
            this.setState({ prices: res.data, loading: false });
        })
        .catch(err => {
            this.setState({ loading: false });
            alert(err);
        }):
        this.setState({ loading: false });
    };
    pricesConvert = () => {
        const result = this.props.resultShopping();
        this.setState({ loading: true });
        this.getValutes(result);
    };
    resetBasket = () => {
        axios.delete('http://localhost:3001/delete_basket')
        .then(res => {
            this.props.resetBasketCount();
            return res;
        })
        .catch(err => {
            alert(err);
        })
    }

    render() {
        const { currency, changeCurrency } = this.props;
        const { prices, loading, currencies } = this.state;
        const { resetBasket } = this;
        return (
            <>
                <InputGroup>
                    <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
                        <DropdownToggle caret>
                            My Basket
                        </DropdownToggle>
                        <DropdownMenu>
                            {currencies.map(item => {
                                return <DropdownItem key = {item.charCode} 
                                            value = {item.charCode}
                                            onClick = {changeCurrency}
                                            >
                                    {item.name}
                                </DropdownItem>
                            })}
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                    <Input value = {currency} disabled />
                    <InputGroupAddon addonType="append"><Button onClick={this.pricesConvert} color="secondary">Result</Button></InputGroupAddon>
                </InputGroup>
                {loading ? 
                    <div className = "basked--content--response">
                        <Spinner color="primary" />
                    </div>
                    :
                    <div className = "basked--content--response">
                        {Object.keys(prices).map(item => {
                            return <Alert key = {item} color = {item === currency ? 'success' : 'secondary'}>
                                {item} {prices[item]}
                            </Alert>;
                        })}
                    </div>
                }
                <InputGroup className = "basked--content--buttonsSend">
                    <Button color="secondary" onClick = {resetBasket}>Reset basket</Button>
                    <Button color="secondary">Buy</Button>
                </InputGroup>
            </>
        );
    };
};

Result.propTypes = {
    basketCount: PropTypes.number.isRequired,
    resultShopping: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    changeCurrency: PropTypes.func.isRequired,
    resetBasketCount: PropTypes.func.isRequired,
};

export default Result;