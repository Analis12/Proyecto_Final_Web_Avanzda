import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../models/mascota';
import { MascotaService } from '../../services/mascota.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-mascotas',
  templateUrl: './mis-mascotas.component.html',
  styleUrls: ['./mis-mascotas.component.css']
})
export class MisMascotasComponent implements OnInit {

  mascotas:Mascota[]=[];
  duenio:string="";
  mascotaseleccionada:Mascota = new Mascota();
  title:string="";
  rol:string="cliente";
  constructor(private masc:MascotaService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      this.duenio = payLoad.cedula;
      this.rol = payLoad.rol;
      if(this.rol=="encargado"){
        this.title="Nuestras Mascotas";
        window
      }else{
        this.title="Mis Mascotas";
      }
    }
    this.masc.listarsegunduenio(this.duenio).subscribe(res=>{
      console.log(res);
      this.mascotas = res['data'];
      this.mascotaseleccionada = this.mascotas[0];
    })
  }
  onChange(deviceValue) {
    this.mascotaseleccionada = deviceValue;
  }
  enrutarregistro(){
    switch(this.rol){
      case "cliente":{
        this.router.navigateByUrl('/cliente/mascotas/registrar');
        break;
      }
      case "encargado":{
        this.router.navigateByUrl('/encargado/mascotas/registrar');
        break;
      }
    }
  }
  enrutar(){
    switch(this.rol){
      case "cliente":{
        this.router.navigateByUrl('/cliente');
        break;
      }
      case "encargado":{
        this.router.navigateByUrl('/encargado');
        break;
      }
    }
    
  }

  actualizar(){
    this.router.navigateByUrl('/cliente/mascotas/modificar/'+this.mascotaseleccionada.id);
  }
  eliminarMascota(){
    Swal.fire({
      title: 'Eliminar Mascota',
      text: "¿Está seguro que desea eliminar el registro de la mascota seleccionada?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No,cambie de idea',
      confirmButtonText: 'Si, eliminalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.masc.eliminar(this.mascotaseleccionada.id).subscribe(res=>{
          Swal.fire(
            'Eliminación Exitosa',
            'El registro ha sido eliminado correctamente',
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
