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


// admin
app.get('/admin', (req, res) => {
  res.render('home');
});

app.get('/admin2', (req, res) => {
  res.render('admin');
});


// roles
app.get('/Roles', (req, res) => {
  res.render('Roles');
});

app.get('/RolesModificar', (req, res) => {
  res.render('forms/RolesModificar');
});

app.get('/RolesRegistrar', (req, res) => {
  res.render('forms/RolesRegistrar');
});

app.get('/RolesVer', (req, res) => {
  res.render('forms/RolesVer');
});


// Usuarios

app.get('/Usuarios', (req, res) => {
  res.render('Usuarios');
});

app.get('/UsuariosVer', (req, res) => {
  res.render('forms/UsuariosVer');
});

app.get('/UsuariosModificar', (req, res) => {
  res.render('forms/UsuariosModificar');
});

app.get('/UsuariosRegistrar', (req, res) => {
  res.render('forms/UsuariosRegistrar');
});

app.get('/Categorias', (req, res) => {
  res.render('Categorias');
});

app.get('/Citas', (req, res) => {
  res.render('Citas');
});

app.get('/CitasVer', (req, res) => {
  res.render('forms/CitasVer');
});

app.get('/CitasModificar', (req, res) => {
  res.render('forms/CitasModificar');
});

app.get('/CitasRegistrar', (req, res) => {
  res.render('forms/CitasRegistrar');
});

app.get('/graficas', (req, res) => {
  res.render('graficas');
});

app.get('/Clientes', (req, res) => {
  res.render('Clientes');
});

app.get('/ClientesUpdate', (req, res) => {
  res.render('forms/clientes/ClientesUpdate');
});

app.get('/ClientesForm', (req, res) => {
  res.render('forms/clientes/ClientesForm');
});

app.get('/ClientesShadow', (req, res) => {
  res.render('forms/clientes/ClientesShadow');
});

app.get('/Compras', (req, res) => {
  res.render('Compras');
});
app.get('/ComprasForm', (req, res) => {
  res.render('forms/ComprasForm');
});

app.get('/ComprasShadow', (req, res) => {
  res.render('forms/ComprasShadow');
});

app.get('/ComprasProductos', (req, res) => {
  res.render('ComprasProductos');
});

app.get('/Empleados', (req, res) => {
  res.render('Empleados');
});

app.get('/EmpleadosForm', (req, res) => {
  res.render('forms/EmpleadosForm');
});

app.get('/EmpleadosMod', (req, res) => {
  res.render('forms/EmpleadosMod');
});

app.get('/EmpleadosVer', (req, res) => {
  res.render('forms/EmpleadosVer');
});

app.get('/Horario', (req, res) => {
  res.render('Horario');
});

app.get('/ProgramFor', (req, res) => {
  res.render('forms/ProgramFor');
});

app.get('/ProgramarAct', (req, res) => {
  res.render('forms/ProgramarAct');
});

app.get('/ProgramarVis', (req, res) => {
  res.render('forms/ProgramarVis');
});

app.get('/pedidos', (req, res) => {
  res.render('pedidos');
});

app.get('/pedidosDetalle', (req, res) => {
  res.render('PedidosDetalles');
});

app.get('/ProductoAdmin', (req, res) => {
  res.render('ProductoAdmin');
});

app.get('/Proveedores', (req, res) => {
  res.render('Proveedores');
});

app.get('/ProveedoreModifi', (req, res) => {
  res.render('ProveedoreModifi');
});

app.get('/ServiciosA', (req, res) => {
  res.render('ServiciosA');
});

app.get('/ServiciosRegister', (req, res) => {
  res.render('forms/servicios/serviciosRegister');
});


app.get('/Usuarios', (req, res) => {
  res.render('Usuarios');
});

app.get('/usuarioModificar', (req, res) => {
  res.render('usuarioModificar');
});

app.get('/Perfil', (req, res) => {
  res.render('Perfil');
});

app.get('/Ventas', (req, res) => {
  res.render('Ventas');
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

app.get('/olvidar', (req, res) => {
  res.render('olvidarc');
});

app.get('/recuperar', (req, res) => {
  res.render('recuperarc');
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log(`La aplicación de ejemplo está escuchando en el puerto ${port}`);
});