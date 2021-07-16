const express = require('express');
const formidable = require('express-formidable');
const { nanoid } = require('nanoid');
const redis = require('redis');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(formidable())

const redisClient = redis.createClient();



app.post('/order', (req, res) => {
  const  { phoneNo, email, foodName } = req.fields;

  const Id = nanoid();

  const orderDetails = {phoneNo, email, foodName, Id};

  const topic = 'order';
  
  const message = JSON.stringify(orderDetails);

 
  redisClient.publish(topic, message, (err, _) => {
      
    console.log(`Published order details to "order" topic`)

      if (err) {
          console.error(err);
          res.sendStatus(500);
      }

      res.status(200).send(`<h1>Order Successful</h1> Order Id: <strong>${Id}</strong>`) 
  });
})




app.listen(3000, () => {
  console.log('Listening on port 3000');
});