//tools
const express = require('express');
const{body, validationResult} =  require('express-validator');
const path = require('node:path');
//routing
const indexRouter = require ('./routes/indexRouter.js')


//server setup
const app = express(()=>{
    console.log('booting server')
});

//ejs setup 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setting up static assets in ane xpress env
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));


//middleware setup
//parse form data to a request body
app.use(express.urlencoded({extended: true}))
//router setup
app.use('/', indexRouter)

//error handeling
app.use((req, res)=>{
    res.render('404')
})

//listining setup

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err)=>{
    if(err) throw new err ;
    console.log(`Server running on port: ${PORT}`);
})


