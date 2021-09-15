import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:Usuario;
  constructor(private auth:UsuarioService) { }

  ngOnInit(): void {
    this.user = new Usuario();
    if(localStorage.getItem('token')){
      const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      this.user.rol = payLoad.rol;
    }    
  }

  logout(){
    this.user = new Usuario();
    this.auth.logout();
  }

}
