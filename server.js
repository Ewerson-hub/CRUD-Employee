const express = require("express");
const handlebars = require("express-handlebars");
const routes = require("./scripts/routes/routes");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;


//Configuration of view engine
app.engine('handlebars', handlebars.engine({
    partialsDir:__dirname + '/views/partials',
    helpers : require('./scripts/controls/helpers-handlebars')
}));
app.set('view engine', 'handlebars');
app.set('views', './views');
  
//configure express for suport css
app.use(express.static('public'));

//configure express for receive json on requisitions
app.use(bodyParser.urlencoded({extended: true}));

//configure routes
app.use('/', routes);

app.listen(3000, () => {
    console.log('server is running in port : ', PORT)
})