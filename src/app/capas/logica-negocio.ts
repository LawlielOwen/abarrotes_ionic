import { Datos, Producto, Usuario } from './datos';

export class LogicaNegocio {
  constructor(private datos: Datos) {}

  registrarUsuario(nombre: string, contrasena: string, genero: string): string {
    if (!nombre.trim() || !contrasena.trim() || !genero) {
      return 'Completa todos los campos';
    }

    if (contrasena.length < 4) {
      return 'La contraseña debe tener al menos 4 caracteres';
    }

    const existe = this.datos.obtenerUsuarios().some(
      usuario => usuario.nombre.toLowerCase() === nombre.trim().toLowerCase()
    );

    if (existe) {
      return 'Ese nombre de usuario ya está registrado';
    }

    const usuario: Usuario = {
      nombre: nombre.trim(),
      contrasena,
      genero
    };

    this.datos.guardarUsuario(usuario);
    return 'OK';
  }

  validarUsuario(nombre: string, contrasena: string): boolean {
    return this.datos.obtenerUsuarios().some(
      usuario => usuario.nombre === nombre.trim() && usuario.contrasena === contrasena
    );
  }

  obtenerProductos(): Producto[] {
    return this.datos.obtenerProductos();
  }

  guardarProducto(producto: Omit<Producto, 'id'>): string {
    if (!producto.codigo.trim() || !producto.nombre.trim() || producto.precio <= 0) {
      return 'Completa correctamente los datos del producto';
    }

    const productos = this.datos.obtenerProductos();

    if (productos.some(item => item.codigo === producto.codigo.trim())) {
      return 'El código ya está registrado';
    }

    productos.push({
      ...producto,
      id: Date.now(),
      codigo: producto.codigo.trim(),
      nombre: producto.nombre.trim()
    });

    this.datos.guardarProductos(productos);
    return 'OK';
  }

  modificarProducto(producto: Producto): string {
    if (!producto.codigo.trim() || !producto.nombre.trim() || producto.precio <= 0) {
      return 'Completa correctamente los datos del producto';
    }

    const productos = this.datos.obtenerProductos();
    const codigoRepetido = productos.some(
      item => item.codigo === producto.codigo.trim() && item.id !== producto.id
    );

    if (codigoRepetido) {
      return 'El código ya está registrado en otro producto';
    }

    const indice = productos.findIndex(item => item.id === producto.id);

    if (indice === -1) {
      return 'No se encontró el producto';
    }

    productos[indice] = {
      ...producto,
      codigo: producto.codigo.trim(),
      nombre: producto.nombre.trim(),
      existencia: Math.max(0, Number(producto.existencia))
    };

    this.datos.guardarProductos(productos);
    return 'OK';
  }

  eliminarProducto(id: number): void {
    const productos = this.datos.obtenerProductos().filter(producto => producto.id !== id);
    this.datos.guardarProductos(productos);
  }

  ajustarExistencia(id: number, cantidad: number): string {
    const productos = this.datos.obtenerProductos();
    const producto = productos.find(item => item.id === id);

    if (!producto) {
      return 'No se encontró el producto';
    }

    const nuevaExistencia = producto.existencia + cantidad;

    if (nuevaExistencia < 0) {
      return 'No hay suficiente stock para realizar la salida';
    }

    producto.existencia = nuevaExistencia;
    this.datos.guardarProductos(productos);
    return 'OK';
  }

  buscarPorCodigo(codigo: string): Producto | undefined {
    return this.datos.obtenerProductos().find(
      producto => producto.codigo === codigo.trim()
    );
  }

  descontarExistencia(id: number, cantidad: number): void {
    this.ajustarExistencia(id, -cantidad);
  }
}
