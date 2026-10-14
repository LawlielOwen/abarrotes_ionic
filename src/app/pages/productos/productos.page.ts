import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Datos, Producto } from '../../capas/datos';
import { Presentacion } from '../../capas/presentacion';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  imports: [CommonModule, FormsModule, RouterLink, IonContent]
})
export class ProductosPage {
  busqueda = '';
  mostrarFormulario = false;
  editando = false;
  mensaje = '';
  ok = false;

  productos: Producto[] = [];

  formulario: Producto = this.formularioVacio();

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

  nuevoProducto(): void {
    this.formulario = this.formularioVacio();
    this.editando = false;
    this.mostrarFormulario = true;
    this.mensaje = '';
  }

  editarProducto(producto: Producto): void {
    this.formulario = { ...producto };
    this.editando = true;
    this.mostrarFormulario = true;
    this.mensaje = '';
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.formulario = this.formularioVacio();
  }

  guardar(): void {
    const producto = {
      ...this.formulario,
      precio: Number(this.formulario.precio),
      existencia: Number(this.formulario.existencia),
      imagen: this.formulario.imagen || 'assets/productos/galletas.svg'
    };

    let resultado: string;

    if (this.editando) {
      resultado = this.presentacion.modificarProducto(producto);
    } else {
      const nuevoProducto = {
        codigo: producto.codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria,
        existencia: producto.existencia,
        imagen: producto.imagen
      };

      resultado = this.presentacion.agregarProducto(nuevoProducto);
    }

    if (resultado === 'OK') {
      this.mensaje = this.editando
        ? 'Producto modificado correctamente'
        : 'Producto agregado correctamente';
      this.ok = true;
      this.mostrarFormulario = false;
      this.cargarProductos();
      return;
    }

    this.mensaje = resultado;
    this.ok = false;
  }

  eliminarProducto(producto: Producto): void {
    const confirmar = window.confirm(`¿Deseas eliminar ${producto.nombre}?`);

    if (!confirmar) {
      return;
    }

    this.presentacion.eliminarProducto(producto.id);
    this.mensaje = 'Producto eliminado correctamente';
    this.ok = true;
    this.cargarProductos();
  }

  private formularioVacio(): Producto {
    return {
      id: 0,
      codigo: '',
      nombre: '',
      precio: 0,
      categoria: '',
      existencia: 0,
      imagen: 'assets/productos/galletas.svg'
    };
  }
}
