import React from 'react';
import { Col, Table } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

import Result from './Result';

import './Basket.scss'

class Basket extends React.Component {
    state = {
        currency: 'RUB',
        basket: [],
        result: 0
    };
    getBasket = () => {
        axios.get(`http://localhost:3001/basket`)
        .then(res => {
            this.props.valuBasketCount(res.data.length);
            this.setState({ basket: res.data });
        })
        .catch(err => {
            alert(err);
        });
    };
    componentDidMount(){
        this.getBasket();
    };
    componentDidUpdate(prevProps){
        (this.props.basketCount !== prevProps.basketCount) && this.getBasket();
    };
    resultShopping = () => {
        const products = this.state.basket;
        let result = 0;
        for(let i = 0; i < products.length; i++){
            result += products[i].price * products[i].quantity;
        }
        return result;
    };
    changeCurrency = event => {
        this.setState({ currency: event.target.value });
    };
    deleteProductFromBasket = event => {
        const product_id = event.currentTarget.getAttribute('product_id');
        axios.delete(`http://localhost:3001/delete/${product_id}`)
        .then(res => {
            this.props.minusBasketCount();
        })
        .catch(err => {
            alert(err);
        })
    }
    render() {
        const { changeCurrency, resultShopping, deleteProductFromBasket } = this;
        const { currency, basket } = this.state;
        const { basketCount, resetBasketCount } = this.props;
        return (
            <Col xl="4" lg="5" md="6" sm="7" xs = '10' className = 'basked'>
                <div className = 'basked--content'>
                    <div className = 'basked--content--title'>
                        <i className="fa fa-shopping-basket"></i>
                        <span>My basket</span>
                    </div>
                    <Table size="sm" className = 'basked--content--table'>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Result</th>
                                <th>Currency</th>
                            </tr>
                        </thead>
                        <tbody className = 'basked--content--table--body'>
                            {basket.map(item => {
                                return <tr key = {item._id}>
                                    <th scope="row">{item.quantity}</th>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.result}</td>
                                    <td>
                                        {item.currency}
                                        <button onClick = {deleteProductFromBasket} product_id = {item.product_id}>
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>;
                            })}
                        </tbody>
                    </Table>
                    <Result 
                        basketCount = { basketCount }
                        resultShopping = {resultShopping}
                        currency = {currency}
                        changeCurrency = {changeCurrency}
                        resetBasketCount = {resetBasketCount}
                    />
                </div>
            </Col>
        );
    };
};

Basket.propTypes = {
    basketCount: PropTypes.number.isRequired,
    minusBasketCount: PropTypes.func.isRequired,
    resetBasketCount: PropTypes.func.isRequired,
    valuBasketCount: PropTypes.func.isRequired
};

export default Basket;