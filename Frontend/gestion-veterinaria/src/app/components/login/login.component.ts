import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:Usuario = new Usuario();
  constructor(private auth:UsuarioService) { }

  ngOnInit(): void {
  }
  login( form: NgForm ) {

    if (  form.invalid ) { return; }

    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Validando información..',
      showConfirmButton: false,
      timer: 1500
    })
    Swal.showLoading();
    
    this.auth.login( this.usuario)
      .subscribe( resp => {
        Swal.close();
        this.auth.verificarRol();
      }, (err) => {
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

}
