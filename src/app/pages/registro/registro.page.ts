import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, eyeOutline, eyeOffOutline, personAddOutline, storefrontOutline, chevronDownOutline } from 'ionicons/icons';
import { Datos } from '../../capas/datos';
import { Presentacion } from '../../capas/presentacion';

@Component({selector:'app-registro',standalone:true,templateUrl:'./registro.page.html',styleUrls:['./registro.page.scss'],imports:[CommonModule,FormsModule,RouterLink,IonContent,IonIcon]})
export class RegistroPage {
  usuario=''; contrasena=''; genero=''; ver=false; mensaje=''; exito=false;
  private presentacion=new Presentacion(new Datos());
  constructor(private router:Router){addIcons({personOutline,lockClosedOutline,eyeOutline,eyeOffOutline,personAddOutline,storefrontOutline,chevronDownOutline});}
  registrar(){const r=this.presentacion.registrar(this.usuario,this.contrasena,this.genero); if(r==='OK'){this.exito=true;this.mensaje='Cuenta creada correctamente';setTimeout(()=>this.router.navigateByUrl('/login'),700);}else{this.exito=false;this.mensaje=r;}}
}
