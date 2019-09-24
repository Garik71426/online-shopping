var express = require('express');
var router = express.Router();
var axios = require('axios');
const Products = require('../models/Products');
const Basket = require('../models/Basket');
const Currencies = require('../models/Currencies');

const convertValutes = (price, valute) => {
	return price / (valute.Value / valute.Nominal);
}

/* GET Valutes with price. */
router.get('/Valutes/:price', function (req, res, next) {
	if (typeof req.params.price !== 'string') {
		return res.status(400).send('Bad Request');
	}
	axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
		.then(valutes => {
			const price = req.params.price;
			const { USD, EUR } = valutes.data.Valute;
			let result = {
				RUB: price,
				USD: convertValutes(price, USD),
				EUR: convertValutes(price, EUR)
			}
			res.send(result)
		})
		.catch(err => {
			res.statusCode(500).send(err)
		});
});

/* GET all products. */
router.get('/products', (req, res) => {
	Products.find((err, Productss) => {
		if (err) {
			console.log(err);
		} else if (Products.length === 0) {
			return res.status(404).send('Not Found');
		} else {
			res.send(Productss);
		}
	});
});

/* GET basket items. */
router.get('/basket', (req, res) => {
	Basket.find((err, basket) => {
		if (err) {
			return err;
		}else {
			res.send(basket);
		}
	});
});

/* add product on basket. basket*/
router.post('/basket/add', (req, res) => {
	if (!req.body.product_id || !req.body.quantity || !req.body.name ||
		!req.body.price || !req.body.price || !req.body.currency) {
			return res.status(400).send('Bad Request');
		}
	Basket.find({ product_id: req.body.product_id }, (err, item) => {
		if (item.length !== 0) {
			return res.status(400).send('Bad Request');
		}
		const body = new Basket({
			product_id: req.body.product_id,
			quantity: req.body.quantity,
			name: req.body.name,
			price: req.body.price,
			result: req.body.result,
			currency: req.body.currency
		});
		body.save(function(post_err) {
			if (post_err)
				throw err;
			else 
				res.status(200).send('ok');
		});
	})
});

/* delete product from basket with product_id. */

router.delete('/delete/:product_id', (req, res) => {
	if (typeof(req.params.product_id) !== 'string') {
		return res.status(400).send('Bad Request');
	}
	const myquery = { product_id: req.params.product_id };
	Basket.remove(myquery, (err, obj) => {
		if (err) {
			return err;
		} else {
			res.status(200).send('ok');
		}
	})
});

/* delete all producs from basket. */

router.delete('/delete_basket', (req, res) => {
	Basket.remove((err, obj) => {
		if(err){
			return err;
		}else{
			res.status(200).send('ok');
		}
	})
});

/* GET all currencies. */
router.get('/currencies', (req, res) => {
	Currencies.find((err, currencies) => {
		if (err) {
			return err;
		} else if (currencies.length === 0) {
			return res.status(404).send('Not Found');
		} else {
			res.send(currencies);
		}
	});
});

module.exports = router;
