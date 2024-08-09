# Backend de leafyshop

## Utilización

Para empezar a usar la api desde el front se debe descargar localmente:
```bash
  git clone https://github.com/GuillermoJCV/leafyshop-back.git
```
```bash
  cd leafyshop-back
```

Ahora necesitamos crear un archivo .env con la siguiente información : 
```env
DATABASE_URL="file:./dev.db"
ENCRYPT_TYPE="aes-256-cbc"
ENCRYPT_KEY="SECRET"
ENCRYPT_SALT="SECRET"
```

Y ejecutar los siguientes comandos:
```bash
  npm install @prisma/client
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
