const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const {ObjectId} = require('mongodb') //gives access to _id in mongodb
var db, collection;

const url =  "mongodb+srv://shay:SHCBk99XpMHfBkqX@cluster0.2n0wm.mongodb.net/?retryWrites=true&w=majority";
const dbName = "the-neighborhood-app";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))//This takes files in the public folder and lets express handle it automatically. 

app.get('/', (req, res) => {
  db.collection('neighborhood').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(result)
    res.render('index.ejs', {posts: result})
    
  })
})


app.post('/addNeighborPost', (req, res) => {
  db.collection('neighborhood')
  .insertOne({
    postType: req.body.postType, 
    date: req.body.date, 
    location: req.body.location, 
    message: req.body.message, 
    name: req.body.name, 
    email: req.body.email, 
    phoneNumber: req.body.phoneNumber,
    heart: 0, 
    going: 0, 
    contacted: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// updateOne({ _id: ObjectId(req.body.plantID)}
// { _id: ObjectId(req.body.postObjectID)
app.put('/updateHeart', (req, res) => {
  db.collection('neighborhood')
  .findOneAndUpdate({ _id: ObjectId(req.body.postObjectID)}, 
  {
    $set: {
      heart:req.body.heart + 1
    }
  },
   {
    sort: {_id: -1}, //Sorts documents in db ascending (1) or descending (-1)
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/updateGoing', (req, res) => {
  db.collection('neighborhood')
  .findOneAndUpdate({ _id: ObjectId(req.body.postObjectID)}, 
  {
    $set: {
      going:req.body.going + 1
    }
  },
   {
    sort: {_id: -1}, //Sorts documents in db ascending (1) or descending (-1)
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/updateContacted', (req, res) => {
  db.collection('neighborhood')
  .findOneAndUpdate({ _id: ObjectId(req.body.postObjectID)}, 
  {
    $set: {
      contacted:req.body.contacted + 1
    }
  },
   {
    sort: {_id: -1}, //Sorts documents in db ascending (1) or descending (-1)
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.delete('/deletePosts', (req, res) => {
  db.collection('neighborhood').findOneAndDelete({ _id: ObjectId(req.body.postObjectID)}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
