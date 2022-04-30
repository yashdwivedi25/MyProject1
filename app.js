// Intialise Node Package Mange(npm) : npm init
// npm install express
// npm install pug

//for database connection(MongoDB) : npm install moongoose
//start mongod in another terminal
//npm install body-parser
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}

//Defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
    
  });

const Contact = mongoose.model('Contact', contactSchema);
const bodyparse = require('body-parser');

const express = require("express");
const path = require("path");
const fs=require("fs");
const app = express();
const port = 8000;

//Express Specific stuff
app.use('/static', express.static('static')); //For Serving Static Files
app.use(express.urlencoded());

//pug specific stuff
app.set('view engine', 'pug'); //Set the Template Engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory

//endpoints
app.get('/', (req, res) => {
    const obj = { };
    /*res.status(200).render('index.pug', obj);*/
    res.status(200).render('home.pug', obj);
});

app.get('/contact', (req, res) => {
    const obj = { };
    res.status(200).render('contact.pug', obj);
});

app.get('/about', (req, res) => {
    const obj = { };
    res.status(200).render('about.pug', obj);
});

app.get('/timings', (req, res) => {
    const obj = { };
    res.status(200).render('timings.pug', obj);
});

app.get('/services', (req, res) => {
    const obj = { };
    res.status(200).render('services.pug', obj);
});

//for storing data in file system
/* app.post('/contact',(req,res)=>{
    Name=req.body.Name;
    phone=req.body.phone;
    email=req.body.email;
    address=req.body.address;
    desc=req.body.desc;
    
    let answer =`Name:${Name} Phone Number:${phone} Email:${email} Addess:${address} Description:${desc}\n`;
    //fs.writeFileSync('output.txt',answer);
    fs.appendFile('output.txt',answer,()=>{
        console.log("Done");
    });
    const messageobj={
    'message':'Your Form has been submitted successfully'
    };
    res.status(200).render('contact.pug', messageobj);
    });
 */


//for storing data in mongodb database
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Item saved to DB");
    }).catch(()=>{
        res.status(400).send("Item not saved to DB ");
    });

    //const obj = { };
    //res.status(200).render('contact.pug');
});



//start the server
app.listen(port, () => {
    console.log(`This application has started successfully on port ${port}`);
});