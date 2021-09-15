import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from 'src/app/models/mascota';

@Component({
  selector: 'app-citasencargado',
  templateUrl: './citasencargado.component.html',
  styleUrls: ['./citasencargado.component.css']
})
export class CitasencargadoComponent implements OnInit {
  citas:Cita[]=[];
  constructor(private cit:CitaService,private cli:ClienteService,private masc:MascotaService) { }

  ngOnInit(): void {
    this.listarcitas();
  }
  listarcitas(){
    if(localStorage.getItem('token')){
      const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      this.cit.listarEncargado(payLoad.cedula).subscribe(res=>{
        console.log(res);
        this.citas = res['data'];
      },(error)=>{},()=>{
        this.citas.forEach(element => {
          element.cliente = new Cliente();
          this.cli.consultar(element.cliente_id).subscribe(res=>{
            element.cliente = res['data'];
          },(error)=>{},()=>{
            element.mascota = new Mascota();
            this.masc.consultar(element.mascota_id).subscribe(res=>{
              element.mascota = res['data'];
            });
          });
        });
        
      })
    }    
    
  }
  
  cancelar(item:Cita){
    Swal.fire({
      title: 'Cancelar Cita',
      text: "¿Está seguro que desea cancelar la cita seleccionada?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No,cambie de idea',
      confirmButtonText: 'Si, cancelalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cit.eliminar(item.id).subscribe(res=>{
          Swal.fire(
            'Cita cancelada',
            'La cita ha sido cancelada correctamente',
            'success'
          )
          window.location.reload();
        },(error)=>{
          Swal.fire(
            'Hubo un error',
            'Vuelva a intentarlo de nuevo',
            'error'
          )
        })
      }
    })
    
  }

}
