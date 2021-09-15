import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EncargadoComponent } from './components/encargado/encargado.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';
import { MisMascotasComponent } from './components/mis-mascotas/mis-mascotas.component';
import { UsuarioService } from './services/usuario.service';
import { ServiceInterceptor } from './services/service.interceptor';
import { RegistrarMascotaComponent } from './components/registrar-mascota/registrar-mascota.component';
import { CitasclienteComponent } from './components/citascliente/citascliente.component';
import { CitasencargadoComponent } from './components/citasencargado/citasencargado.component';
import { ListadohistoriasclinicasComponent } from './components/listadohistoriasclinicas/listadohistoriasclinicas.component';
import { AgregarhistoriaclinicaComponent } from './components/agregarhistoriaclinica/agregarhistoriaclinica.component';
import { AgregarproductoComponent } from './components/agregarproducto/agregarproducto.component';
import { AgregaradopcionComponent } from './components/agregaradopcion/agregaradopcion.component';
import { JuguetesComponent } from './components/juguetes/juguetes.component';
import { AccesoriosComponent } from './components/accesorios/accesorios.component';
import { AseosComponent } from './components/aseos/aseos.component';
import { CuidadosComponent } from './components/cuidados/cuidados.component';
import { JuguetesadopcionComponent } from './components/juguetesadopcion/juguetesadopcion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    ClienteComponent,
    EncargadoComponent,
    CatalogoComponent,
    NoticiasComponent,
    AgendarCitaComponent,
    MisMascotasComponent,
    RegistrarMascotaComponent,
    CitasclienteComponent,
    CitasencargadoComponent,
    ListadohistoriasclinicasComponent,
    AgregarhistoriaclinicaComponent,
    AgregarproductoComponent,
    AgregaradopcionComponent,
    JuguetesComponent,
    AccesoriosComponent,
    AseosComponent,
    CuidadosComponent,
    JuguetesadopcionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
