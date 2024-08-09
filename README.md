# Backend de leafyshop

## Utilización

Para empezar a usar la api desde el front se debe descargar localmente
y ejecutar los siguientes comandos:
```bash
  git clone https://github.com/GuillermoJCV/leafyshop-back.git
```
```bash
  cd leafyshop-back
```
```bash
  npm i && npm run start:seed
```
Este último comando no solo instalará todos los paquetes sino que creará una información inicial para poder hacer pruebas

De esta manera ya podemos ejecutar el backend que servirá la información en el puerto 3000

### Herramientas Principales

* Nest
* Node (crypto / buffer)
* TypeScript && JavaScript
* Passport && JwtPassport
* Prisma

### Herramientas secundarias

* SWC (Rust compiler)
* Express adapter
* Jest (Testing)
* Zod (Validations)
* Rxjs

## Descripción

Es el backend de la tienda de [LeafyShop](https://github.com/GuillermoJCV/leafyshop-front), para manerjar tanto el auth como las peticiones a productos, países, categorías, clientes y empleados.
