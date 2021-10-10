# IngSoft2

CONTEXTO:
El proyecto del 1er Sprint consiste de que hay 3 usuarios (admin, organizador y participante lider), cuando 
se inicie sesion, el sistema se encargara de ver que tipo de cuenta estan ingresando, si el caso fuera de admin,
se le enviara a otra pagina donde podra administrar los usuarios, en el caso del organizador sera enviado a otra
pagina donde tendra un interfaz para registrar torneos y para el participante lider se quedara en la misma pagina
solo que la parte del boton del "Iniciar sesion" cambiara al nombre del participante lider, al hacer click no
no saldra la ventana emergente para logearse sino saldra 4 botones adicionales que seria las acciones que tendra
el participante lide. Otra funcionalidad esta la de registrar, que tiene 4 parametros, los paramaetros de correo y equipo
no puede haber mas de 1, por ejemplo si somos 2 equipos que queremso tener el mismo nombre, pues el sistema se encargara
de avisar al equipo ultimo en registrarse de que ya hay nombre del equipo registrado y debera escoger otra
, lo mismo es con la de correo. Con respecto la funcionalidad de las otras paginas se iniciara esto en el sigueinte Sprint,
este sprint 1 es para comprobar las sessiones(admin, organizador y participante lider) y registro de los aprticipante lider.

REQUISITOS:
- Tener instalado el Visual StudioCode, NodeJS y PostgreSQ.
- En el Node JS:
    -Ir al terminal de la direccion de la carpeta del proyecto "IngSoft2-main" y colocar el siguiente codigo
      "npm run dev" sin las comillas, esto hara que el servidor pueda correr, debemos fijarnos el archivo
      IngSoft2-main/package.json , ver el objeto "dependencies" de que este el express, pg, ps-hstore y sqquelize,
      y en el objeto "devDependencies" debe estar nodemon y squelize-cli, en caso que no este esto las import que estan
      en los archivos javascritp no funcionara.
- En el PostgreSQL
    - Se recomienda instalar el pgadmin4, es un programa que recreada el postgresql en entorno grafico, para facilitar la
      creacion de la base de datos.
      Debe crear la base de datos y el usuario con el nombre de "postgres", las contraseña debe ser "jean", el host 
      y el puerto dejarlo por defecto lo que escoge el pgadmin4.
    - Se deberar crear 3 tablas con las siguiente atributos: "tabla(atributos o columnas)"
      
      admin (adminname, adminpass)
      organizador(orgname, orgpass)
      partlider(usuario, correo, password, equipo)
      
      Se deberar introducir 1 fila en la tabla admin y organizador, puede escoger a su preferencia los datos, esto es para
      comprobar el inicio de session de admin y oraganizador, en la tabla partlider, no es necesario ingresar, debido que
      en el proyecto esta el JS que se encarga de registrar los participante lider en la base de datos.
      
 - En el Visual studio Code:
     - Instalar el pluggin o extension llamado "Live server" esto es para hacer correr la pagina del Frontend.
     

Para iniciar el proyecto debe encender el backend con nodejs en el terminal de la ruta de la carpeta del proyecto
(npm run dev) y el frontend con el live server (abra un boton de este pluggin en el visual studio code para encender).

Cualquier duda contactar conmigo al whatsapp 945051151, no recibo llamada, solo whatsapp.

