import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  url = environment.url + 'mascotas';

  constructor(private http: HttpClient) { }

  guardar(m: Mascota): Observable<any> {
    const mascotaBody = JSON.stringify(c);
    if (m.id === undefined) {
      return this.http.post<any>(this.url+'/registrar-mascota', mascotaBody, environment.httpOptions);
    }
    return this.http.put<any>(this.url+'/actualizar-mascota', mascotaBody, environment.httpOptions);
  }
  consultar(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(this.url + '/' + id, environment.httpOptions)
      .pipe(retry(1));
  }

  eliminar(id:number): Observable<any> {
    return this.http.delete<any>(this.url + '/eliminar-mascota/' + id, environment.httpOptions);
  }

  listar(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.url+'/listar-mascotas', environment.httpOptions)
      .pipe(retry(1));
  }
}
