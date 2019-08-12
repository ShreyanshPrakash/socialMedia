const express = require('express');
const fs = require('fs');

const app = express();


// app.use( express.static (
//     path.join( __dirname, '../', 'dist')
// ))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

//api endpoints

app.get('/restservice/users/getallusers', ( req,res ) => {

    // res.json({
    //     "success": "restservice/users/getallusers"
    // })
    fs.createReadStream( __dirname + '/users.json' ).pipe(res);

})

app.get('/restservice/users/getuserfriends', ( req,res ) => {
    res.json({
        "success": "restservice/users/getuserfriends"
    })
})

app.get('/restservice/users/getuserfriendsoffriends', ( req,res ) => {
    res.json({
        "success": "restservice/users/getuserfriendsoffriends"
    })
})

app.get('*', (req,res) => {
    res.send('hit');
})



app.listen( 4400, () => {
    console.log( 'listening at port 4400');
})