import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {
  url = environment.url + 'encargados';

  constructor(private http: HttpClient) { }

  guardar(e: Encargado): Observable<any> {
    const encargadoBody = JSON.stringify(c);
    if (e.id === undefined) {
      return this.http.post<any>(this.url+'/registrar-encargado', encargadoBody, environment.httpOptions);
    }
    return this.http.put<any>(this.url+'/actualizar-encargado', encargadoBody, environment.httpOptions);
  }
  consultar(id: number): Observable<Encargado> {
    return this.http.get<Encargado>(this.url + '/' + id, environment.httpOptions)
      .pipe(retry(1));
  }

  eliminar(id:number): Observable<any> {
    return this.http.delete<any>(this.url + '/eliminar-encargado/' + id, environment.httpOptions);
  }

  listar(): Observable<Encargado[]> {
    return this.http.get<Encargado[]>(this.url+'/listar-encargados', environment.httpOptions)
      .pipe(retry(1));
  }
}
