import { Component, OnInit } from "@angular/core";
import { LoginService } from './../service/login.service';
import { Router } from '@angular/router';
import { UsuarioModel } from './../models/usuario';
import { async } from 'rxjs/internal/scheduler/async';

import { MenuController, ModalController } from "@ionic/angular";
import { ArticuloService } from '../service/articulo.service';
import { Articulo } from '../models/articulo';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage {

  public usuario:UsuarioModel
  public misArticulos: Articulo[]
  constructor(private menu: MenuController, private auth:LoginService, private router:Router,  private Api: ArticuloService, private modalCtrl:ModalController) { }

  //Usuario Logeado//
  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  openEnd() {
    this.menu.close();
  };
  //Muestra sólo los artículos del usuario Logueado//
  VerArticulos(){
    return this.Api.getArticulos(this.auth.usuarioId.usuario_id).subscribe((data:Articulo[])=>{
      this.misArticulos=data
      console.log(this.misArticulos)
    })
  };


  async abirModal(id:number){
    const modal = await this.modalCtrl.create({
      component: ModalComponent, componentProps:{"articuloId":id}

    });
    await modal.present()
  }


  cerrarSesion(){
    this.auth.logOut() 
    window.location.reload();
  }

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  ngOnInit() {
    this.usuarioLogeado();
    this.VerArticulos();
  }
}
