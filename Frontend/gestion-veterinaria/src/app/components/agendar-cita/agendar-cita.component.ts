import { Component, OnInit } from '@angular/core';
import { Cita } from '../../models/cita';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente.service';
import { Mascota } from '../../models/mascota';
import { MascotaService } from '../../services/mascota.service';
import { Servicio } from '../../models/servicio';
import { CitaService } from '../../services/cita.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  cita:Cita = new Cita();
  mascotas:Mascota[]=[];
  cliente:Cliente = new Cliente();
  mascotaseleccionada:Mascota = new Mascota();
  servicios:Servicio[]=[];
  servicioseleccionado:Servicio = new Servicio();
  constructor(private cli:ClienteService,private masc:MascotaService,private cit:CitaService,private router:Router) { }

  ngOnInit(): void {
    this.obtenercliente();
    this.obtenerservicios();
    
  }
  guardar( form: NgForm ) {

    if (  form.invalid ) { return; }
    this.cita.servicio.descripcion = this.servicioseleccionado.descripcion;
    this.cita.servicio.tipo = this.servicioseleccionado.tipo
    this.cita.mascota_id = this.mascotaseleccionada.id;
    this.cita.cliente_id = this.cliente.id;
    this.cita.encargado_id = "1236589658";
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Validando información..',
      showConfirmButton: false,
      timer: 1500
    })
    Swal.showLoading();
    this.cit.guardar(this.cita).subscribe(res=>{
      Swal.close();
        this.router.navigateByUrl('/cliente');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
    },(err) => {
      console.log(err);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Hubo un error vuelva a intentarlo',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  obtenercliente(){
    if(localStorage.getItem('token')){
      const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      this.cli.consultar(payLoad.cedula).subscribe(result=>{
        this.cliente = result['data'];
        console.log(result);
      },(error)=>{},()=>{
        this.obtenerMascotas(payLoad.cedula);
      })
    }    
  }
  obtenerMascotas(duenio:string){
    this.masc.listarsegunduenio(duenio).subscribe(res=>{
      console.log(res);
      this.mascotas = res['data'];
      this.mascotaseleccionada = this.mascotas[0];
    })
  }
  onChange(deviceValue) {
    this.mascotaseleccionada = deviceValue;
  }
  onChangeServicio(deviceValue) {
    this.servicioseleccionado = deviceValue;
  }
  obtenerservicios(){
    let servicio1:Servicio = new Servicio();
    let servicio2:Servicio = new Servicio();
    servicio1.tipo="Peluquería";
    servicio1.descripcion = "Servicio de cuidado de su mascota";
    servicio2.tipo="Veterinaria";
    servicio2.descripcion = "Servicio de cuidado de salud de su mascota";
    this.servicios.push(servicio1);
    this.servicios.push(servicio2);
  }
}
