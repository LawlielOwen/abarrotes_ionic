import { Routes } from '@angular/router';
export const routes:Routes=[
 {path:'',redirectTo:'bienvenida',pathMatch:'full'},
 {path:'bienvenida',loadComponent:()=>import('./pages/bienvenida/bienvenida.page').then(m=>m.BienvenidaPage)},
 {path:'login',loadComponent:()=>import('./pages/login/login.page').then(m=>m.LoginPage)},
 {path:'registro',loadComponent:()=>import('./pages/registro/registro.page').then(m=>m.RegistroPage)},
 {path:'inicio',loadComponent:()=>import('./pages/inicio/inicio.page').then(m=>m.InicioPage)},
 {path:'inventario',loadComponent:()=>import('./pages/inventario/inventario.page').then(m=>m.InventarioPage)},
 {path:'productos',loadComponent:()=>import('./pages/productos/productos.page').then(m=>m.ProductosPage)},
 {path:'ventas',loadComponent:()=>import('./pages/ventas/ventas.page').then(m=>m.VentasPage)},
 {path:'**',redirectTo:'bienvenida'}
];
