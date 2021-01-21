import { Component, OnInit } from "@angular/core";
import { HomeserviceService } from "../shared/homeservice.service";
import { Router } from "@angular/router";
import { LoginService } from "./../service/login.service";
import { UsuarioModel } from "./../models/usuario";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public articulos: any;
  public usuario: UsuarioModel;

  constructor(
    private api: HomeserviceService,
    private router: Router,
    private auth: LoginService
  ) {}

  usuarioLogeado() {
    this.usuario = this.auth.usuarioId;
  }

  mostrarTodos() {
    this.api.getTodos(this.usuario.usuario_id).subscribe((data: any) => {
      this.articulos = data;
      console.log(data);
    });
  }
  mostrartype(categoria) {
    this.api.gettype(categoria).subscribe((data: any[]) => {
      this.articulos = data;
      console.log(categoria);
    });
  }

  mostrarInfo(articulo_id: Number) {
    this.router.navigate(["/info-articulo", articulo_id]);
  }

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  ngOnInit() {
    this.usuarioLogeado();
    this.mostrarTodos();
  }
}
