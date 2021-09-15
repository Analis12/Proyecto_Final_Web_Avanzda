import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EncargadoComponent } from './components/encargado/encargado.component';
import { AuthGuard } from './guards/auth.guard';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';
import { MisMascotasComponent } from './components/mis-mascotas/mis-mascotas.component';
import { RegistrarMascotaComponent } from './components/registrar-mascota/registrar-mascota.component';
import { CitasclienteComponent } from './components/citascliente/citascliente.component';
import { CitasencargadoComponent } from './components/citasencargado/citasencargado.component';
import { ListadohistoriasclinicasComponent } from './components/listadohistoriasclinicas/listadohistoriasclinicas.component';
import { AgregarhistoriaclinicaComponent } from './components/agregarhistoriaclinica/agregarhistoriaclinica.component';
import { AgregarproductoComponent } from './components/agregarproducto/agregarproducto.component';
import { AgregaradopcionComponent } from './components/agregaradopcion/agregaradopcion.component';
import { AseosComponent } from './components/aseos/aseos.component';
import { AccesoriosComponent } from './components/accesorios/accesorios.component';
import { JuguetesComponent } from './components/juguetes/juguetes.component';
import { CuidadosComponent } from './components/cuidados/cuidados.component';
import { JuguetesadopcionComponent } from './components/juguetesadopcion/juguetesadopcion.component';

const routes: Routes = [
  {path: 'inicio', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegistroComponent},
  {path: 'catalogo/comidas', component: CatalogoComponent},
  {path: 'catalogo/accesorios', component: AccesoriosComponent},
  {path: 'catalogo/articulos-aseo', component: AseosComponent},
  {path: 'catalogo/juguetes', component: JuguetesComponent},
  {path: 'noticias/adopcion', component: NoticiasComponent},
  {path: 'noticias/novedades', component: JuguetesadopcionComponent},
  {path: 'noticias/cuidados', component: CuidadosComponent},

  {path: 'cliente', component: ClienteComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['cliente']} },
  {path: 'cliente/catalogo', component: CatalogoComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['cliente']} },
  {path: 'cliente/noticias', component: NoticiasComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['cliente']} },
  {path: 'cliente/citas/agendar', component: AgendarCitaComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['cliente']} },
  {path: 'cliente/citas/mis-citas', component: CitasclienteComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['cliente']} },
  {path: 'cliente/mis-mascotas', component: MisMascotasComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['cliente']} },
  {path: 'cliente/mascotas/registrar', component: RegistrarMascotaComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['cliente']} },
  {path: 'cliente/mascotas/modificar/:id', component: RegistrarMascotaComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['cliente']} },

  {path: 'encargado', component: EncargadoComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']}},
  {path: 'encargado/catalogo/comidas', component: CatalogoComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/catalogo/accesorios', component:AccesoriosComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/catalogo/juguetes', component:JuguetesComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/catalogo/articulos-aseo', component: AseosComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/catalogo', component: CatalogoComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/catalogo/agregar', component: AgregarproductoComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/noticias', component: NoticiasComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/citas/mis-citas', component: CitasencargadoComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/historiasclinicas/listado', component: ListadohistoriasclinicasComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/historiasclinicas/agregar', component: AgregarhistoriaclinicaComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/historiasclinicas/modificar/:id', component: AgregarhistoriaclinicaComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/mis-mascotas', component: MisMascotasComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/mascotas/registrar', component: RegistrarMascotaComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/mascotas/modificar/:id', component: RegistrarMascotaComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  {path: 'encargado/adopciones/agregar', component: AgregaradopcionComponent, canActivate: [ AuthGuard ], data: {permittedRoles: ['encargado']} },
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: '**', redirectTo: 'inicio'}
  //{ path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: [ AuthGuard ], data: {permittedRoles: ['A','T']}  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
