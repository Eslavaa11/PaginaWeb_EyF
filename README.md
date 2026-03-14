# Explorador de Países - Vue 3

Este proyecto es una aplicación web desarrollada con **Vue 3** que permite explorar información básica de diferentes países utilizando una **API pública**. La aplicación permite buscar países, filtrarlos por región, ordenarlos alfabéticamente y guardar favoritos.

Además, se utiliza **Pinia** para manejar el estado global de la aplicación y **localStorage** para guardar las preferencias del usuario.

---

## Tecnologías utilizadas

- Vue 3
- Vite
- Pinia
- JavaScript
- CSS
- REST Countries API

---

## Funcionalidades principales

### Búsqueda dinámica
El usuario puede buscar países escribiendo en la barra de búsqueda. Los resultados se actualizan automáticamente mientras se escribe.

### Filtro por región
Permite filtrar los países por región para facilitar la navegación entre los resultados.

### Ordenamiento
Los países pueden ordenarse de forma:
- Ascendente (A-Z)
- Descendente (Z-A)

### Sistema de favoritos
Cada país puede marcarse como favorito usando el botón de estrella en la tarjeta del país.

### Persistencia de datos
Los países favoritos y algunas preferencias del usuario se guardan en **localStorage**, por lo que se mantienen incluso si la página se recarga.

### Manejo de estado global
Se utiliza **Pinia** para gestionar el estado de la aplicación, incluyendo:
- lista de países
- favoritos
- filtros activos
- ordenamiento
- búsqueda

### Experiencia de usuario
La aplicación incluye:
- indicador de carga mientras se obtienen los datos
- manejo de errores
- mensaje cuando no se encuentran resultados
- diseño responsive adaptable a diferentes pantallas

---

## Estructura del proyecto


src
├── components
│ └── CountryCard.vue
│
├── stores
│ └── countryStore.js
│
├── App.vue
├── main.js
└── style.css


- **components** → Componentes reutilizables
- **stores** → Manejo del estado global con Pinia
- **App.vue** → Componente principal de la aplicación
- **style.css** → Estilos generales de la interfaz

---

## Cómo ejecutar el proyecto

1. Instalar las dependencias


npm install


2. Ejecutar el servidor de desarrollo


npm run dev


3. Abrir la aplicación en el navegador


http://localhost:5173


---

## Autor Andres Eslava