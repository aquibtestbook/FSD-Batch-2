const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Home Route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

// Signup Route
app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/signup.html'));
});

app.post('/signup', async function (req, res) {

    //form data
    let userName = req.body.username;
    let userAge = req.body.userage;
    console.log(userAge + userName);

    //db connection
    const uri = "mongodb+srv://aquibnew:thisispwd@mongodbtutorial.qxz7mqh.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();

    //store data
    const result = await client.db("user_data").collection("all_users").insertOne({ name: userName, age: userAge });
    console.log("New data added : " + result.insertedId);

    res.redirect('/profile');

    // res.end();
});

// Profile Route
app.get('/profile', async function (req, res) {
    // res.sendFile(path.join(__dirname + '/views/profile.html'));

    //db connection
    const uri = "mongodb+srv://aquibnew:thisispwd@mongodbtutorial.qxz7mqh.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();

    //fetch data
    const result = await client.db("user_data").collection("all_users").findOne({ name: "Aquib" });
    console.log("Data found : " + result.name);
    res.send(result.name + " is " + result.age + " years old!");

    res.end();
});

app.listen(3000, function () {
    console.log("Server started!");
});

