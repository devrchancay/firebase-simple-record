### Simple Record Audio

#### Como probarlo

```bash
  $ git clone https://github.com/devrchancay/firebase-simple-record
  $ cd firebase-simple-record
  $ yarn
```

tanto para el cliente y el servidor hay archivos `.env.example` con el contenido por defecto basta con `cp .env.example .env` para que funcione,

#### Levantar cliente

```bash
yarn workspace simple-audio-client start
```

Es necesario crear una carpeta la carpeta server/uploads y darle permisos de escritura para poder subir los archivos

#### Levantar servidor

```bash
yarn workspace simple-audio-server start
```

Cualquier duda me lo pueden consultar al correo.
