const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const serviciosRouter = require('./routes/servicios'); 

//configuración del motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname,'./public')));

app.use('/', indexRouter);
app.use('/servicio', serviciosRouter);
app.listen(3050,()=>console.log('Servidor corriendo en puerto 3050'));

app.get('/busqueda-servicios',(req,res)=>{
    res.sendFile(path.join(path.join(__dirname,'views/busqueda_servicios.html')));
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(path.join(__dirname,'views/login.html')));
});

app.get('/register',(req,res)=>{
    res.sendFile(path.join(path.join(__dirname,'views/register.html')));
});

app.get('/contacto-experto',(req,res)=>{
    res.sendFile(path.join(path.join(__dirname,'views/contacto_experto.html')));
});