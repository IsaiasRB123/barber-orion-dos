const express = require('express');
const hbs = require('hbs');
const app = express();
const port = 2006;

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/admin');


// Servir contenido estático
app.use(express.static('public'));
app.use(express.static('public/ADMIN'));

app.get('/admin', (req, res) => {
  res.render('admin/home');
});

app.get('/admin2', (req, res) => {
  res.render('admin/admin');
});

app.get('/Roles', (req, res) => {
  res.render('admin/Roles');
});

app.get('/Categorias', (req, res) => {
  res.render('admin/Categorias');
});

app.get('/Citas', (req, res) => {
  res.render('admin/Citas');
});

app.get('/graficas', (req, res) => {
  res.render('admin/graficas');
});

app.get('/Clientes', (req, res) => {
  res.render('admin/Clientes');
});

app.get('/Compras', (req, res) => {
  res.render('admin/Compras');
});

app.get('/Empleados', (req, res) => {
  res.render('admin/Empleados');
});

app.get('/Horario', (req, res) => {
  res.render('admin/Horario');
});

app.get('/pedidos', (req, res) => {
  res.render('admin/pedidos');
});

app.get('/ProductoAdmin', (req, res) => {
  res.render('admin/ProductoAdmin');
});

app.get('/Proveedores', (req, res) => {
  res.render('admin/Proveedores');
});

app.get('/ServiciosA', (req, res) => {
  res.render('admin/ServiciosA');
});

app.get('/Usuarios', (req, res) => {
  res.render('admin/Usuarios');
});

app.get('/Perfil', (req, res) => {
  res.render('admin/Perfil');
});

app.get('/Ventas', (req, res) => {
  res.render('admin/Ventas');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/servicios', (req, res) => {
  res.render('servicios');
});


app.get('/productos', (req, res) => {
  res.render('productos');
});

app.get('/agendar', (req, res) => {
  res.render('agendar');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log(`La aplicación de ejemplo está escuchando en el puerto ${port}`);
});
