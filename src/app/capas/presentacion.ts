import { Datos, Producto } from './datos';
import { LogicaNegocio } from './logica-negocio';

export class Presentacion {
  private logica: LogicaNegocio;

  constructor(datos: Datos) {
    this.logica = new LogicaNegocio(datos);
  }

  registrar(nombre: string, contrasena: string, genero: string) {
    return this.logica.registrarUsuario(nombre, contrasena, genero);
  }

  validar(nombre: string, contrasena: string) {
    return this.logica.validarUsuario(nombre, contrasena);
  }

  mostrarProductos() {
    return this.logica.obtenerProductos();
  }

  agregarProducto(producto: Omit<Producto, 'id'>) {
    return this.logica.guardarProducto(producto);
  }

  modificarProducto(producto: Producto) {
    return this.logica.modificarProducto(producto);
  }

  eliminarProducto(id: number) {
    this.logica.eliminarProducto(id);
  }

  ajustarStock(id: number, cantidad: number) {
    return this.logica.ajustarExistencia(id, cantidad);
  }

  escanearProducto(codigo: string) {
    return this.logica.buscarPorCodigo(codigo);
  }

  vender(id: number, cantidad: number) {
    this.logica.descontarExistencia(id, cantidad);
  }
}
