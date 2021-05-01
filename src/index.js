const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://admin:ab123456@travelagencydb.k5ge2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const session = require('express-session');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/../css')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: 'userSID',
    secret: 'something',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000
    }
}));


client.connect(err => {
    const collection = client.db('TravelAgency').collection('users');
    console.log('Connected to mongoDB');


    app.get('/', (req, res)=> {
        res.render('home');
        res.status(200);
    });
    app.get('/home.ejs', (req, res)=> {
        res.render('home');
        res.status(200);
    });

    app.post('/auth', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        if(collection) {
            collection.find({'username':username, 'password':password}).toArray((err, users) => {
                if(users.length === 1 ){
                    req.session.user = {
                        'id': users[0].id
                    };
                    console.log('Connected as ' +username);
                }
                else{
                    console.log('User does not exist!');
                }
            });
        }


        res.render('home');
        res.status(200);
    });

    app.listen(port, ()=>{
        console.log(`server is up and running at http://127.0.0.1:${port}`);
    });

});










