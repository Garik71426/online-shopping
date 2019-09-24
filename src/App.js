import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import Header from './components/Header/Header';
import Products from './components/Products/Products'
import Basket from './components/Basket/Basket';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends Component {
    state = {
        basketCount: 0,
    };
    plusBasketCount = () => {
        this.setState({ basketCount: this.state.basketCount + 1 });
    };
    minusBasketCount = () => {
        this.setState({ basketCount: this.state.basketCount - 1 });
    };
    resetBasketCount = () => {
        this.setState({ basketCount: 0 });
    };
    valuBasketCount = count => {
        this.setState({ basketCount: count });
    }
    render() {
        const { basketCount } = this.state;
        const { plusBasketCount, minusBasketCount, resetBasketCount, valuBasketCount } = this;
        return (
            <div className="App">
                <Container>
                    <Header/>
                    <Row>
                        <Products 
                            plusBasketCount = {plusBasketCount} 
                        />
                        <Basket 
                            basketCount = {basketCount} 
                            minusBasketCount = {minusBasketCount}
                            resetBasketCount = {resetBasketCount}
                            valuBasketCount = {valuBasketCount}
                        />
                    </Row>
                </Container>
            </div>
        );
    };
};

export default App;
