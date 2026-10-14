import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { storefrontOutline, arrowForwardOutline, personAddOutline } from 'ionicons/icons';
@Component({selector:'app-bienvenida',standalone:true,templateUrl:'./bienvenida.page.html',styleUrls:['./bienvenida.page.scss'],imports:[RouterLink,IonContent,IonIcon]})
export class BienvenidaPage{constructor(){addIcons({storefrontOutline,arrowForwardOutline,personAddOutline});}}
