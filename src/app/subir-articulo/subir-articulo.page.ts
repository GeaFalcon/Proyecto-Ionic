// import { Component, OnInit } from '@angular/core';
// import { ArticuloService } from '../service/articulo.service';
// import { Articulo } from '../models/articulo';
// import { UsuarioModel } from '../models/usuario';
// import { LoginService } from '../service/login.service';

// @Component({
//   selector: 'app-subir-articulo',
//   templateUrl: './subir-articulo.page.html',
//   styleUrls: ['./subir-articulo.page.scss'],
// })
// export class SubirArticuloPage implements OnInit {
//   public valor: string = " ";
//   public usuario: UsuarioModel;
//   constructor(private Api: ArticuloService, private auth: LoginService) { }

//   usuarioLogeado(){
//     this.usuario = this.auth.usuarioId;
//   }

//   insertarArticulo(nombre:string,antiguedad:string,descripcion:string,estado:string,categoria:string,imagen:string){
//     let articulo= new Articulo;
//     articulo.nombre=nombre;
//     articulo.antiguedad=antiguedad;
//     articulo.descripcion=descripcion;
//     articulo.estado=estado;
//     articulo.categoria=categoria;
//     articulo.imagen=imagen;
//     articulo.usuario_id=this.usuario.usuario_id;
//     return this.Api.postArticulo(articulo).subscribe((data)=>{
//       console.log(data);
//       console.log(articulo);
//     })
//   };

//   ngOnInit() {
//     this.usuarioLogeado();
//   }

// }



import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../service/articulo.service';
import { Articulo } from '../models/articulo';
import { ToastController } from '@ionic/angular';
import { UsuarioModel } from '../models/usuario';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subir-articulo',
  templateUrl: './subir-articulo.page.html',
  styleUrls: ['./subir-articulo.page.scss'],
})
export class SubirArticuloPage implements OnInit {
  public valor: string = " ";
  public usuario: UsuarioModel;
  constructor(private Api: ArticuloService, public toastController: ToastController, private auth: LoginService, private router: Router) { }

  
  usuarioLogeado(){
    this.usuario = this.auth.usuarioId;
  }

    insertarArticulo(nombre:string,antiguedad:string,descripcion:string,estado:string,categoria:string,imagen:string){
    let articulo= new Articulo;
    articulo.nombre=nombre;
    articulo.antiguedad=antiguedad;
    articulo.descripcion=descripcion;
    articulo.estado=estado;
    articulo.categoria=categoria;
    articulo.imagen=imagen;
    articulo.usuario_id=this.usuario.usuario_id;
    return this.Api.postArticulo(articulo).subscribe((data)=>{
      console.log(data);
      this.presentToastConfirmacion();
    })
  };
 

  async presentToastConfirmacion(){
    const toast = await this.toastController.create({
      message: 'Artículo subido',
      duration: 2000,
      color: "success",
      position: "middle"
    });
    toast.present().then(() => { this.router.navigate(['/perfil'])});
  }


  ngOnInit() {
    this.usuarioLogeado();
  }

}

