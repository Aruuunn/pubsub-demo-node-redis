const express = require('express');
const formidable = require('express-formidable');
const uuid = require('uuid').v1;
const redis = require('redis');

const  app = express();
app.use(formidable())

const redisClient = redis.createClient();


app.use(express.static(__dirname + '/public'));


app.post('/order', (req, res) => {
  const  { phoneNo, email, foodName } = req.fields;

  const Id = uuid();

  const payload = JSON.stringify({phoneNo, email, foodName, Id});

  console.log(`Publishing order, Order Id: ${Id}  `)

    redisClient.publish('order', payload, (err, _) => {
       
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }

        res.status(200).send(`Order Successful!...Order Id: ${Id}`) 
    });

})




app.listen(3000, () => {
  console.log('Listening on port 3000');
});