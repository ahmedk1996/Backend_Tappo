const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();



const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM menu1';


const connection = mysql.createConnection({
	host:'localhost',
	user: 'root',
	password: '2845687aA',
	database: 'Tappo' 
});

connection.connect(err => {
	if(err){
		return err;
	}
});



app.use(cors());

app.get('/', (req,res) => {
	res.send('go to /menu to see data')
});

app.get('/menu/add', (req,res) => {
	const { item_name, item_price} = req.query;
	const INSERT_PRODUCTS_QUERY = 'INSERT INTO menu1 (item_name, item_price) VALUES (item_name, item_price)';
	connection.query(INSERT_PRODUCTS_QUERY,(err,results) => {
		if(err){
			return res.send(err)

		}
		else{
			return 
			res.send('Successfully added  item')
		}
	});
});


app.get('/menu', (req,res) => {
	connection.query(SELECT_ALL_PRODUCTS_QUERY,(err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}
	});
});



app.listen(4000, () => {
	console.log("Products server listening on port 4000")
});