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
//Fin Usuarios

//Servicios

app.get('/ServiciosA', (req, res) => {
  res.render('ServiciosA');
});

app.get('/ServiciosRegister', (req, res) => {
  res.render('forms/servicios/serviciosRegister');
});

app.get('/ServiciosUpdate', (req, res) => {
  res.render('forms/servicios/serviciosUpdate');
});

app.get('/ServiciosShadow', (req, res) => {
  res.render('forms/servicios/serviciosShadow');
});
//Fin Servicios

//categorias
app.get('/Categorias', (req, res) => {
  res.render('Categorias');
});

app.get('/CategoriasRegistro', (req, res) => {
  res.render('forms/categorias/categoriasRegistro');
});

app.get('/CategoriasModificar', (req, res) => {
  res.render('forms/categorias/categoriasModificar');
});

app.get('/CategoriasShowww', (req, res) => {
  res.render('forms/categorias/categoriasShow');
});
//Fin categorias
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

//compras
app.get('/Compras', (req, res) => {
  res.render('Compras');
});
app.get('/ComprasForm', (req, res) => {
  res.render('forms/Compras/ComprasForm');
});

app.get('/ComprasV', (req, res) => {
  res.render('forms/Compras/ComprasV');
});

app.get('/ComprasUpdate', (req, res) => {
  res.render('forms/Compras/ComprasUpdate');
});

app.get('/ComprasProductos', (req, res) => {
  res.render('ComprasProductos');
});
//fin compras

//Empleados
app.get('/Empleados', (req, res) => {
  res.render('Empleados');
});

app.get('/EmpleadosForm', (req, res) => {
  res.render('forms/Empleados/EmpleadosForm');
});

app.get('/EmpleadosMod', (req, res) => {
  res.render('forms/Empleados/EmpleadosMod');
});

app.get('/EmpleadosVer', (req, res) => {
  res.render('forms/Empleados/EmpleadosVer');
});

//fin empleados

//progrmacion
app.get('/Horario', (req, res) => {
  res.render('Horario');
});

app.get('/dias', (req, res) => {
  res.render('dias');
});

app.get('/ProgramFor', (req, res) => {
  res.render('forms/Programacion/ProgramFor');
});

app.get('/ProgramarAct', (req, res) => {
  res.render('forms/Programacion/ProgramarAct');
});

app.get('/ProgramarVis', (req, res) => {
  res.render('forms/Programacion/ProgramarVis');
});
//fin progreamacion

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

app.get('/VentasForm', (req, res) => {
  res.render('forms/ventas/RegistrarVentas');
});

app.get('/VentasUpdate', (req, res) => {
  res.render('forms/ventas/ModificarVentas');
});

app.get('/VentasVistas', (req, res) => {
  res.render('forms/ventas/VentasVistas');
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