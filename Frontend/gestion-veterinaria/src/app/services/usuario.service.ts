import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = environment.url+"usuarios";
  userToken: string;
  constructor(private http: HttpClient,private router:Router) { 
    this.leerToken();
  }
  
  login(usuario: Usuario): Observable<Usuario> {
    const authData = {
      email:usuario.email,
      password:usuario.password,
      returnSecureToken: true
    };
    console.log(authData);
    return this.http.post<any>(this.url+'/login-email', authData, environment.httpOptions).pipe(
      map( resp => {
        this.guardarToken( resp.message['idToken'] );
        return resp;
        
      })
    );
  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    this.router.navigateByUrl("/login");
  }
  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString() );


  }

  estaAutenticado(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if ( expiraDate > new Date() ) {
      return true;
    } else {
      this.logout();
      return false;
    }

  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.rol;
    allowedRoles.forEach((element:any) => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  
  verificarRol(){
    let rol:string = "";
    var payLoad = JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]));
    rol = payLoad.rol;
    switch(rol){
      case "cliente":
        this.router.navigateByUrl('/cliente');
        break;
      case "encargado":
          this.router.navigateByUrl('/encargado');
          break;
    }
  }

  sesionOpen(){
    if(this.estaAutenticado()){
      this.verificarRol();
    }
  }
}
