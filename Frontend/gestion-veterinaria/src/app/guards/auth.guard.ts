import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: UsuarioService,private router: Router) {}

  canActivate(next:ActivatedRouteSnapshot): boolean  {
    
    if ( this.auth.estaAutenticado() ) {
      let roles = next.data['permittedRoles'] as Array<string>;
      if(roles){
        if(this.auth.roleMatch(roles)){
          return true;
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: "No esta autorizado"
          });
          this.auth.verificarRol();
          return false;
        }
      }
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: "No has iniciado sesión"
      });
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
