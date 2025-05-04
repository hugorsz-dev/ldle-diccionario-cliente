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

**L·DLE** *(Libre Diccionario de la Lengua Española)* es una aplicación que proporciona todas las funcionalidades lexicográficas de un diccionario de español moderno y completo, con la ventaja de ser completamente libre y de poder usarse sin conexión a internet.

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

##  Instalación desde cero

- Ve al repositorio de [ldle-diccionario-db](https://github.com/hugorsz-dev/) y sigue las instrucciones.

- Mueve el archivo resultante del anterior paso (`diccionario_sin_etiquetas_con_conjugaciones_sinonimos_redirecciones_sin_redundancias.json`) dentro de la carpeta `database` de este repositorio. 

### Linux

Para sistemas operativos con base Linux, deberás ejecutar los siguientes comandos para componer el *AppImage* mediante electron: 

``` bash

npm install electron-builder

chmod +x ./node_modules/app-builder-bin/linux/x64/app-builder

npm run build-linux

```

Tras de lo cual, el ejecutable se instalará dentro de la carpeta `dist`. Dale permisos de ejecución: `chmod +x LDLE-x.x.x.AppImage` y ejecuta la aplicación: `./LDLE-x.x.x.AppImage`.

## Uso

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

