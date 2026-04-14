const express = require("express");
const handlebars = require("express-handlebars");

const mainRoutes = require("./scripts/routes/main.routes");
const userRoutes = require("./scripts/routes/user.routes");
const employeeRoutes = require("./scripts/routes/employee.routes");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

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

//configure app to recive cookies from requisition
app.use(cookieParser());

//configure express for receive json on requisitions
app.use(bodyParser.urlencoded({extended: true}));

//configure routes
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/employee', employeeRoutes);

app.listen(PORT, () => {
    console.log('server is running in port : ', PORT)
})