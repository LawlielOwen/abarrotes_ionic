export interface Usuario {
  nombre: string;
  contrasena: string;
  genero: string;
}

export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  categoria: string;
  existencia: number;
  imagen: string;
}

export interface VentaItem {
  producto: Producto;
  cantidad: number;
}

export class Datos {
  private claveUsuarios = 'usuarios_abarrotes';
  private claveProductos = 'productos_abarrotes';

  obtenerUsuarios(): Usuario[] {
    const usuarios = localStorage.getItem(this.claveUsuarios);
    return usuarios ? JSON.parse(usuarios) : [];
  }

  guardarUsuario(usuario: Usuario): void {
    const usuarios = this.obtenerUsuarios();
    usuarios.push(usuario);
    localStorage.setItem(this.claveUsuarios, JSON.stringify(usuarios));
  }

  obtenerProductos(): Producto[] {
    const guardados = localStorage.getItem(this.claveProductos);

    if (guardados) {
      return JSON.parse(guardados);
    }

    const iniciales: Producto[] = [
      { id: 1, codigo: '7501001', nombre: 'Leche', precio: 28, categoria: 'Lácteos', existencia: 18, imagen: 'assets/productos/leche.svg' },
      { id: 2, codigo: '7501002', nombre: 'Pan de caja', precio: 42, categoria: 'Panadería', existencia: 12, imagen: 'assets/productos/pan.svg' },
      { id: 3, codigo: '7501003', nombre: 'Arroz', precio: 32, categoria: 'Despensa', existencia: 25, imagen: 'assets/productos/arroz.svg' },
      { id: 4, codigo: '7501004', nombre: 'Frijoles', precio: 30, categoria: 'Despensa', existencia: 20, imagen: 'assets/productos/frijoles.svg' },
      { id: 5, codigo: '7501005', nombre: 'Huevos', precio: 48, categoria: 'Básicos', existencia: 15, imagen: 'assets/productos/huevos.svg' },
      { id: 6, codigo: '7501006', nombre: 'Refresco', precio: 39, categoria: 'Bebidas', existencia: 30, imagen: 'assets/productos/refresco.svg' },
      { id: 7, codigo: '7501007', nombre: 'Aceite', precio: 46, categoria: 'Despensa', existencia: 14, imagen: 'assets/productos/aceite.svg' },
      { id: 8, codigo: '7501008', nombre: 'Galletas', precio: 22, categoria: 'Snacks', existencia: 24, imagen: 'assets/productos/galletas.svg' }
    ];

    this.guardarProductos(iniciales);
    return iniciales;
  }

  guardarProductos(productos: Producto[]): void {
    localStorage.setItem(this.claveProductos, JSON.stringify(productos));
  }
}
