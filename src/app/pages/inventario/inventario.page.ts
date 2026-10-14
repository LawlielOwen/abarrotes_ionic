import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Datos, Producto } from '../../capas/datos';
import { Presentacion } from '../../capas/presentacion';

@Component({
  selector: 'app-inventario',
  standalone: true,
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
  imports: [CommonModule, FormsModule, RouterLink, IonContent]
})
export class InventarioPage {
  busqueda = '';
  cantidades: { [id: number]: number } = {};
  mensaje = '';
  ok = false;

  productos: Producto[] = [];

  private presentacion = new Presentacion(new Datos());

  constructor() {
    this.cargarProductos();
  }

  get productosFiltrados(): Producto[] {
    const texto = this.busqueda.toLowerCase().trim();

    if (!texto) {
      return this.productos;
    }

    return this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(texto) ||
      producto.codigo.toLowerCase().includes(texto)
    );
  }

  cargarProductos(): void {
    this.productos = this.presentacion.mostrarProductos();
  }

  agregarStock(producto: Producto): void {
    const cantidad = Number(this.cantidades[producto.id]);

    if (!cantidad || cantidad <= 0) {
      this.mostrarMensaje('Ingresa una cantidad mayor a 0', false);
      return;
    }

    const resultado = this.presentacion.ajustarStock(producto.id, cantidad);
    this.mostrarResultado(resultado, 'Stock agregado correctamente');

    if (resultado === 'OK') {
      this.cantidades[producto.id] = 0;
      this.cargarProductos();
    }
  }

  reducirStock(producto: Producto): void {
    const cantidad = Number(this.cantidades[producto.id]);

    if (!cantidad || cantidad <= 0) {
      this.mostrarMensaje('Ingresa una cantidad mayor a 0', false);
      return;
    }

    const resultado = this.presentacion.ajustarStock(producto.id, -cantidad);
    this.mostrarResultado(resultado, 'Stock reducido correctamente');

    if (resultado === 'OK') {
      this.cantidades[producto.id] = 0;
      this.cargarProductos();
    }
  }

  private mostrarResultado(resultado: string, mensajeCorrecto: string): void {
    if (resultado === 'OK') {
      this.mostrarMensaje(mensajeCorrecto, true);
    } else {
      this.mostrarMensaje(resultado, false);
    }
  }

  private mostrarMensaje(mensaje: string, correcto: boolean): void {
    this.mensaje = mensaje;
    this.ok = correcto;
  }
}
