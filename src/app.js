var express = require('express')
var router = require('./router.js')

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './src/views')
app.use(router)

app.listen(3000,function(){
    console.log("Server active in port 3000");
});