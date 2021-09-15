import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { tap} from 'rxjs/operators';
import { UsuarioService } from './usuario.service';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {

  constructor(private router: Router,private auth:UsuarioService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if (localStorage.getItem('token') != null) {
      const clonedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
          tap(
              succ => { },
              err => {
                  if (err.status == 401){
                    Swal.fire({
                        icon: 'error',
                        title: 'Acceso Denegado',
                        text: "No esta autorizado ha realizar la siguiente petición"
                      });
                      this.auth.sesionOpen();
                  }
                  else if(err.status == 403)
                  console.error("NO AUTORIZADO");
              }
          ),
      )
  }
  else
      return next.handle(req.clone());
}
}