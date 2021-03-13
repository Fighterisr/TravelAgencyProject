const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('src'));

app.get('*', (req, res)=> {
    res.sendFile(__dirname + '/Home.html');

});

app.listen(port, ()=>{
    console.log(`server is up and running at http://127.0.0.1:${port}`);
});