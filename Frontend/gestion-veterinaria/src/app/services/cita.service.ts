import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  url = environment.url + 'citas';

  constructor(private http: HttpClient) { }

  guardar(c: Cita): Observable<any> {
    const citaBody = JSON.stringify(c);
    if (c.id === undefined) {
      return this.http.post<any>(this.url+'/registrar-cita', citaBody, environment.httpOptions);
    }
    return this.http.put<any>(this.url+'/actualizar-cita', citaBody, environment.httpOptions);
  }
  consultar(id: number): Observable<Cita> {
    return this.http.get<Cita>(this.url + '/' + id, environment.httpOptions)
      .pipe(retry(1));
  }

  eliminar(id:number): Observable<any> {
    return this.http.delete<any>(this.url + '/eliminar-cita/' + id, environment.httpOptions);
  }

  listar(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.url+'/listar-citas', environment.httpOptions)
      .pipe(retry(1));
  }
}
