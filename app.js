const express = require('express');
const app = express();
const PORT = process.env.PORT || 3050;
const path = require('path');
const indexRouter = require('./routes/index');
const serviciosRouter = require('./routes/servicios'); 
const usuariosRouter = require('./routes/usuarios');
const apiServiciosRouter = require('./routes/api/servicios');
const apiUsuariosRouter = require('./routes/api/usuarios');
const methodOverride = require('method-override');
const session = require('express-session');
const usuarioLogueadoMiddleware = require('./middlewares/usuarioLogueadoMiddleware');
const cookie = require('cookie-parser');
const cors = require('cors');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'jobbook2022',
    resave: false,
    saveUninitialized: false}));
app.use(cookie());

//configuración para capturar información de los formularios
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//configuración del motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname,'./public')));
app.use(usuarioLogueadoMiddleware);

app.use('/', indexRouter);
app.use('/servicio', serviciosRouter);
app.use('/usuario',usuariosRouter );

app.use('/api/servicios', apiServiciosRouter);
app.use('/api/usuarios', apiUsuariosRouter);

app.use(methodOverride('_method'));
app.listen(PORT,()=>console.log('Servidor corriendo en puerto '+ PORT));

