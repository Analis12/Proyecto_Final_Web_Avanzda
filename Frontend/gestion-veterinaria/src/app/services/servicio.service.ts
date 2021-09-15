import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  url = environment.url + 'servicios';

  constructor(private http: HttpClient) { }

  guardar(s: Servicio): Observable<any> {
    const servicioBody = JSON.stringify(c);
    if (p.id === undefined) {
      return this.http.post<any>(this.url+'/registrar-servicio', servicioBody, environment.httpOptions);
    }
    return this.http.put<any>(this.url+'/actualizar-servicio', servicioBody, environment.httpOptions);
  }
  consultar(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(this.url + '/' + id, environment.httpOptions)
      .pipe(retry(1));
  }

  eliminar(id:number): Observable<any> {
    return this.http.delete<any>(this.url + '/eliminar-servicio/' + id, environment.httpOptions);
  }

  listar(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.url+'/listar-servicios', environment.httpOptions)
      .pipe(retry(1));
  }
}
