import React, { Component, Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

import Product from './Product';

import './Products.scss';

class Products extends Component {
    state = {
        products: []
    };
    componentDidMount(){
        axios.get(`http://localhost:3001/products`)
        .then(res => {
            this.setState({ products: res.data });
        })
        .catch(err => {
            alert(err);
        });
    };
    render() {
        const { products } = this.state;
        const { plusBasketCount } = this.props;
        return (
            <Col xl="8" lg="7" md="6" sm="5" xs = '10' className = 'products'>
                <div className = 'products--title'>
                    <span>P</span>
                    <span>R</span>
                    <span>O</span>
                    <span>D</span>
                    <span>U</span>
                    <span>C</span>
                    <span>T</span>
                    <span>S</span>
                </div>
                <Row>
                    {products.map(item => {
                        return <Fragment key = {item._id}>
                            <Product 
                                product_id = {item._id}
                                currency = 'RUB'
                                img = {item.img}
                                name = {item.name}
                                price = {item.price}
                                plusBasketCount = {plusBasketCount}
                            />
                        </Fragment>;
                    })}
                </Row>
            </Col>
        );
    };
};

Products.propTypes = {
    plusBasketCount: PropTypes.func.isRequired
};

export default Products;