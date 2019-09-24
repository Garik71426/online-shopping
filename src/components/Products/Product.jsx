import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col,
    Input
} from 'reactstrap';
import PropTypes from 'prop-types';

class Product extends Component {
    state = {
        quantity: 1
    };
    addProductOnBasket = () => {
        const { plusBasketCount, name, price, product_id, currency } = this.props;
        const { quantity } = this.state;
        const result = price * quantity;
        const body = {
            product_id: product_id,
            quantity: quantity,
            name: name,
            price: price,
            result: result,
            currency: currency
        };
        axios.post(`http://localhost:3001/basket/add`, body)
        .then(res => {
            plusBasketCount();
            this.setState({ quantity: 1 });
        })
        .catch(err => {
            alert(err);
        });
    };
    changeQuantity = event => {
        this.setState({ quantity: event.target.value });
    }
    render() {
        const { img, name, price } = this.props;
        const { quantity } = this.state;
        const { changeQuantity, addProductOnBasket } = this;
        return (
            <Col xl="4" lg="6" md="12" sm="12" xs = '10'>
                <Card>
                    <CardImg top width="100%" src={img} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{name}</CardTitle>
                        <CardSubtitle><Input type = 'number' min= {1} max = {100} value = {quantity} onChange = {changeQuantity}/></CardSubtitle>
                        <CardText>{price} RUB</CardText>
                        <Button onClick = {addProductOnBasket}>Add to basket</Button>
                    </CardBody>
                </Card>
            </Col>
        );
    };
};

Product.propTypes = {
    product_id: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    img: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    plusBasketCount: PropTypes.func.isRequired
};

export default Product;