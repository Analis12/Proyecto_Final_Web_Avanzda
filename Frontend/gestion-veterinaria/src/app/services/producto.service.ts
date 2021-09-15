import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = environment.url + 'productos';

  constructor(private http: HttpClient) { }

  guardar(p: Producto): Observable<any> {
    const productoBody = JSON.stringify(c);
    if (p.id === undefined) {
      return this.http.post<any>(this.url+'/registrar-producto', productoBody, environment.httpOptions);
    }
    return this.http.put<any>(this.url+'/actualizar-producto', productoBody, environment.httpOptions);
  }
  consultar(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.url + '/' + id, environment.httpOptions)
      .pipe(retry(1));
  }

  eliminar(id:number): Observable<any> {
    return this.http.delete<any>(this.url + '/eliminar-producto/' + id, environment.httpOptions);
  }

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url+'/listar-productos', environment.httpOptions)
      .pipe(retry(1));
  }
}
