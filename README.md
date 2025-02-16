# CVMATCHER - Prueba Técnica

## 🚀 Instrucciones para ejecutar el proyecto

### 🔧 Requisitos previos
Asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (versión recomendada: 18+)
- [Angular CLI](https://angular.io/cli) (versión recomendada: 16+)
- [Git](https://git-scm.com/)

### 📥 Clonar el repositorio
```sh
git clone https://github.com/tu-usuario/renato-prueba-tecnica-cvmatcher.git
cd renato-prueba-tecnica-cvmatcher
```

### 📦 Instalar dependencias
```sh
npm install
```

### ▶️ Ejecutar la aplicación en modo desarrollo
```sh
ng serve
```
Luego, abre tu navegador en:
```
http://localhost:4200/
```

### 🏗 Construir la aplicación para producción
```sh
ng build --configuration=production
```
Los archivos generados estarán en la carpeta `dist/`.

---

## 📌 Detalles de la implementación

### 📁 Estructura del proyecto
```
📂 src/
 ├── 📂 app/
 │   ├── 📂 components/         # Componentes reutilizables
 │   ├── 📂 mocks/              # Datos para simular la API
 │   ├── 📂 services/           # Servicios de la aplicación
 │   ├── 📂 models/             # Modelos de datos
 │   ├── 📜 app.component.ts    # Componente raíz
```

### 🔍 Funcionalidades implementadas
✅ **Filtrado de trabajos:**
   - Filtrado por título, ubicación, sueldo mínimo y años de experiencia.
   - Persistencia de filtros en la URL.
   - Actualización de resultados al buscar.

✅ **Gestión de estado con Signals:**
   - Almacenamiento de trabajos en `signal<Map<number, Job>>()`.
   - Filtrado eficiente sin necesidad de modificar el estado original.

✅ **Navegación dinámica:**
   - La URL se actualiza con los parámetros de búsqueda.
   - Permite compartir enlaces con filtros aplicados.

✅ **Interfaz moderna con Angular 19:**
   - Uso de `@for` para mejorar rendimiento en listas.
   - Implementación con `Reactive Forms` para manejar los filtros.

### 🛠 Tecnologías utilizadas
- **Angular 19** - Framework principal.
- **TypeScript** - Tipado fuerte para mayor robustez.
- **RxJS** - Manejo de programación reactiva.
- **Angular Signals** - Gestión eficiente del estado.
- **Angular Router** - Navegación y manejo de URL.

---

## 📜 Notas adicionales
Si tienes algún problema o sugerencia, no dudes en abrir un issue en el repositorio. 😊

