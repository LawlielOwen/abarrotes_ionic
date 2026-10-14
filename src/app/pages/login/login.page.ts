import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, eyeOutline, eyeOffOutline, arrowForwardOutline, storefrontOutline } from 'ionicons/icons';
import { Datos } from '../../capas/datos';
import { Presentacion } from '../../capas/presentacion';

@Component({selector:'app-login',standalone:true,templateUrl:'./login.page.html',styleUrls:['./login.page.scss'],imports:[CommonModule,FormsModule,RouterLink,IonContent,IonIcon]})
export class LoginPage {
  usuario=''; contrasena=''; ver=false; mensaje='';
  private presentacion = new Presentacion(new Datos());
  constructor(private router:Router){addIcons({personOutline,lockClosedOutline,eyeOutline,eyeOffOutline,arrowForwardOutline,storefrontOutline});}
  ingresar(){
    if(!this.usuario.trim() || !this.contrasena){this.mensaje='Escribe tu usuario y contraseña'; return;}
    if(this.presentacion.validar(this.usuario,this.contrasena)){localStorage.setItem('sesion_abarrotes',this.usuario.trim()); this.router.navigateByUrl('/inicio');}
    else this.mensaje='Usuario o contraseña incorrectos';
  }
}
