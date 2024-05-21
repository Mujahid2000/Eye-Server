const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();


//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mujahid.frqpuda.mongodb.net/?retryWrites=true&w=majority&appName=Mujahid`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const AddCartCollection = client.db('Eye-Shop').collection('cart')
    // Connect the client to the server	(optional starting in v4.7)

    app.post('/addCart', async(req, res) =>{
        const product = req.body
        const result = await AddCartCollection.insertOne(product);
        res.send(result);
      });

      app.get('/addCart', async (req, res) =>{
        const result = await AddCartCollection.find().toArray();
        res.send(result);
      })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res) =>{
    res.send('running server')
})

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})
