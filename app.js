const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname,'./public')));

app.listen(3050,()=>console.log('Servidor corriendo en puerto 3050'));

app.get('/busqueda-servicios',(req,res)=>{
    res.sendFile(path.join(path.join(__dirname,'views/busqueda_servicios.html')));
});
app.get('/',(req,res)=>{
    res.sendFile(path.join(path.join(__dirname,'views/home.html')));
});

app.get('/servicio',(req,res)=>{
    res.sendFile(path.join(path.join(__dirname,'views/detalle_servicio.html')));
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