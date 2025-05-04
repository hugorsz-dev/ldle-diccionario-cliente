# L·DLE - Libre Diccionario de la Lengua Española

<div align="center">
<h1 class="title" id="title_searching" style="font-size: 70px; letter-spacing: 0;">
    <span style="color:rgb(48, 48, 48)">L·</span>
    <span style="color:rgb(18, 27, 99);">D</span>
    <span style="color:rgb(246, 187, 40)">L</span>
    <span style="color:rgb(18, 27, 99)">E</span>
</h1>
  
[![Version](https://img.shields.io/badge/version-0.9.0-blue.svg)](https://github.com/username/ldle)
[![License](https://img.shields.io/badge/license-GPL--3.0-green.svg)](LICENSE)

*Un diccionario libre de la lengua española*
  
</div>

## Descripción

L·DLE (Libre Diccionario de la Lengua Española) es una aplicación que proporciona todas las funcionalidades lexicográficas de un diccionario de español moderno y completo, con la ventaja de ser completamente libre y de poder usarse sin conexión a internet.

Desarrollado como una alternativa libre a los recursos lexicográficos privados, L·DLE aspira a convertirse en una herramienta para estudiantes, escritores, programadores y cualquier persona interesada en el idioma español.

## Características

-  **Búsquedas avanzadas**:
  - Búsqueda exacta
  - Palabras que empiezan por...
  - Palabras que terminan en...
  - Palabras que contienen...
  - Anagramas
  - Palabras aleatorias

-  **Información completa**:
  - Definiciones
  - Origen etimológico
  - Formas compuestas
  - Sinónimos
  - Expresiones relacionadas

-  **Historial de búsquedas** para acceder rápidamente a consultas anteriores

-  **Corrector ortográfico** que sugiere alternativas para palabras mal escritas

-  **Sugerencias automáticas** mientras escribes

-  **Funciona sin conexión** - toda la base de datos está integrada

##  Instalación

### Aplicación Web

Simplemente abre el archivo `index.html` en tu navegador favorito.

### Windows

1. Descarga el archivo instalador `.exe` o `.setup`
2. Ejecuta el instalador y sigue las instrucciones
3. Inicia L·DLE desde el menú de inicio o el acceso directo creado en el escritorio

### Linux

1. Descarga el archivo AppImage
2. Dale permisos de ejecución: `chmod +x LDLE-x.x.x.AppImage`
3. Ejecuta la aplicación: `./LDLE-x.x.x.AppImage`

## Uso

![Interfaz de L·DLE](https://via.placeholder.com/800x450?text=Interfaz+de+L·DLE)

1. Escribe una palabra en el campo de búsqueda
2. Selecciona el tipo de búsqueda en la barra lateral
3. Explora los resultados con toda la información disponible
4. Navega entre palabras relacionadas haciendo clic en los enlaces
5. Consulta tu historial para retomar búsquedas anteriores

## Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar L·DLE, puedes:

1. Reportar errores o sugerir mejoras en la sección de issues
2. Proponer nuevas palabras o correcciones a definiciones existentes
3. Contribuir con código para mejorar la interfaz o añadir nuevas funcionalidades

Consulta la guía de contribución para más detalles.

## Licencia

Este proyecto está licenciado bajo la [Licencia GPL-3.0](LICENSE) - vea el archivo LICENSE para más detalles.

---

<div align="center">
  <p>Desarrollado con ❤️ por Hugo Ruiz Sánchez</p>
  <p>© 2024 - L·DLE: Haciendo accesible el conocimiento de la lengua española</p>
</div>
[1. (primo,ma)
errores en la búsqueda de "cobacha" (covacha)
añadir las formas compuestas como palabras (redir: 
los anagramas no funcionan con "ñ"
las palabras escrita en mayúscula "HOLA" arrojan como erróneas, añadir una comprobación en las palabras erroneas (incorrect) para admitir ese caso (pasar todas las letras a minúsculas)

emblematizada" no se encuentra en el diccionario (verbos masculinos sí, femeninos no, añadir esa comprobación)

algunas redirecciones enlazan a una sola palabra - poetisa, arcoíris

sinónimos redundantes (faltriquera)

(al avío - avío) las formas compuestas se preceden de un "loc", incorrecto. 

alabarda 

-> (tea) en las formas compuestas, ver que todas las definiciones terminen con un "." al final, de modo que no haya acepciones mal puestas. 
Eliminar "["

Al hacer anagramas, la "canonización" se realiza, y pasa las "ñ" a "n", eso hay que modificarlo en el frontend

si hay una letra suelta al final  de una forma compuesta, pasarla a la acepción (cedro)

yuxtaposición
> sinónimo repite la palabra

al buscar la palabra "haces" -> hacer, haz

la palabra "neciamnente"
