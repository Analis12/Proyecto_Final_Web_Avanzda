import { Usuario } from './usuario';
import { Servicio } from './servicio';
export class Encargado extends Usuario{
    id:string="";
    experiencia:number=0;
    servicio:Servicio = new Servicio();
}