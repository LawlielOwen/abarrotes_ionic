# Abarrotes Ionic

Proyecto escolar Ionic + Angular organizado en tres capas:
- `src/app/capas/presentacion.ts`
- `src/app/capas/logica-negocio.ts`
- `src/app/capas/datos.ts`

Pantallas: bienvenida, inicio de sesión, registro y panel con módulos de Inventario, Productos y Ventas.

## Ejecutar
```bash
npm install
ionic serve
```

## Flujo
1. Crear cuenta.
2. Iniciar sesión.
3. Elegir Inventario, Productos o Ventas.
4. En Ventas se puede simular un escáner escribiendo un código (por ejemplo 7501001) y presionando Enter o Agregar.
5. El cobro es en efectivo y calcula el cambio.
