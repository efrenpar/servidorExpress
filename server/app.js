var express = require('express');
var app = express();
var path = require("path");
var router = express.Router();
const Sequelize = require("sequelize");

const sequelize = new Sequelize('auton', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
})


sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })


const Persona = sequelize.define('personas', {
  id: {type: Sequelize.SMALLINT, primaryKey: true},
  nombre: Sequelize.STRING,
  apellido: Sequelize.STRING,
  edad: Sequelize.SMALLINT,
  fechaDeNacimiento: Sequelize.DATE,
})


Persona.findAll({ attributes: ['nombre', 'apellido', 'edad', 'fechaDeNacimiento'] })
  .then(personas => {
    console.log(personas)
  })
  .catch(err => {
    console.log(err)
  })


router.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/index.html'));
	console.log("GET/index");
});

router.get('/about',function(req,res){

	res.sendFile(path.join(__dirname+'/about.html'));
	console.log("GET/about");
});



app.use('/css',express.static('css'));
app.use('/images',express.static('images'))

app.use('/',router);
app.use(function(req, res, next) {

  
  res.status(404).sendFile(path.join(__dirname+'/error.html'));
  console.error(res.statusCode+"page not found");

});

app.listen(process.env.port || 8000);

console.log("running at port 8000");
//console.log('server started');