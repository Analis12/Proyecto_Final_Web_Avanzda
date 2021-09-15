import { HistoriaClinica } from './historia-clinica';
export class Mascota{
    id:string;
    nombre:string;
    raza:string;
    edad:number;
    color:string;
    historiaclinica:HistoriaClinica = new HistoriaClinica();
    duenio_id:string;
}