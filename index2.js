import express from "express";
import bodyParser from 'body-parser';
import { Client } from "pg"; // Import PostgreSQL Client
import path from 'path';
const app = express();
const port = 3000;

// PostgreSQL connection configuration
const db = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  port: 5432 // default PostgreSQL port
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/checkout', (req, res) => {
  const totalcartprice = req.body.totalcartprice;
  const cartItems = req.body.cartItems;
  const address = req.body.address;
  const phone = req.body.phone;

  // Assuming you have a table named 'orders' with columns 'total_price', 'cart_items', 'address', 'phone'
  const sql = 'INSERT INTO orders (total_price, cart_items, address, phone) VALUES ($1, $2, $3, $4)';

  db.query(sql, [totalcartprice, cartItems, address, phone], (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Order inserted successfully');
      res.status(200).json({ message: 'Order placed successfully' });
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile('./store.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
