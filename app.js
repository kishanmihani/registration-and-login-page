var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000;

var app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopoLogy: true
});
var db = mongoose.connection;
db.on('error', function () {
    console.log("error in connecting to database");
    db.once('open', function () {
        console.log("connected database");
    });
})
//inserting data process in code
app.post("/signup", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": password
    }
    db.collection('tblper').insertOne(data, function (err, collection) {
        if (!err) {
            console.log("record inserted");
            return res.redirect('signup-success.html');
        }
        else {
            console.log(err.message);
        }

    })

})
//login data process
app.post("/signup-login-successfully.html", function (req, res) {

    var email = req.body.email;
    var password = req.body.password;
    var dat = {

        "email": email,
        "password": password

    }
    db.collection('tbleper').find(dat).toArray(function (err, collection) {
        if (!err) {
            console.log(documents);
            return res.redirect('/signup-login-successfully.html');
        }
        else {
            console.log(err.message);
        }
    })


})
//Forget-Password in proccess
app.post("/signup-success", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var finddocument = { "email": email };
    var newPassword = { $set: { "password": password } };
    db.collection('tblper').updateOne(finddocument, newPassword, function (err, documents) {
        if (!err) {
            console.log(documents);
            console.log("record update");

        }
        else {
            console.log(err.message);
        }
    })
    //console.log("2:-" + err)
    return res.redirect("/signup-success.html");
})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });

    return res.redirect('registration.html');
    // res.send("Hello Kishan");
}).listen(port);
console.log("Listening on Kishan servser http://localhost:3000 ");