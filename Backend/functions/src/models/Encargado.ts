import { Usuario } from './Usuario';
import { Servicio } from './Servicio';
export class Encargado extends Usuario{
    id:string="";
    experiencia:number=0;
    servicio:Servicio = new Servicio();
}