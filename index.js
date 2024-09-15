import express from "express";
// import path from "path";
import bodyParser from 'body-parser';
import mysql from "mysql2";
import env from 'dotenv';
const app=express();
// app.use(env())
const port=3000;
// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'server'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("C:\\Users\\ASUS\\Downloads\\pro"));
app.post('/checkout', (req, res) => {
  const totalcartprice = req.body.totalcartprice;
  const cartItems = req.body.cartItems;
  const address = req.body.address;
  const phone = req.body.phone;
  // Assuming you have a table named 'orders' with columns 'total_price' and 'cart_items'
  const sql = 'INSERT INTO orders (total_price, cart_items, address, phone) VALUES (?, ?, ?, ?)';

  db.query(sql, [totalcartprice, cartItems, address, phone], (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      // res.status(500).json({ error: 'Internal Server Error' });
      
    } else {
      console.log('Order inserted successfully');
      // res.status(200).json({ message: 'Order placed successfully' });
    }
  });
});
app.get('/', (req, res) => {
    res.sendFile('./store.html');
  });

  app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);

});
