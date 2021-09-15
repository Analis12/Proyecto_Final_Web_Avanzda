import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = environment.url + 'clientes';

  constructor(private http: HttpClient) { }

  guardar(c: Cliente): Observable<any> {
    const clienteBody = JSON.stringify(c);
    if (c.id === undefined) {
      return this.http.post<any>(this.url+'/registrar-cliente', clienteBody, environment.httpOptions);
    }
    return this.http.put<any>(this.url+'/actualizar-cliente', clienteBody, environment.httpOptions);
  }
  consultar(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.url + '/' + id, environment.httpOptions)
      .pipe(retry(1));
  }

  eliminar(id:number): Observable<any> {
    return this.http.delete<any>(this.url + '/eliminar-cliente/' + id, environment.httpOptions);
  }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url+'/listar-clientes', environment.httpOptions)
      .pipe(retry(1));
  }
}
