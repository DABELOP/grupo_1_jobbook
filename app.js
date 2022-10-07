const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const serviciosRouter = require('./routes/servicios'); 
const usuariosRouter = require('./routes/usuarios')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

//configuración del motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname,'./public')));

app.use('/', indexRouter);
app.use('/servicio', serviciosRouter);
app.use('/usuario',usuariosRouter );

app.listen(3050,()=>console.log('Servidor corriendo en puerto 3050'));

