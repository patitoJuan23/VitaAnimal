# 🐾 VitaAnimal - Sitio Web Estático & Chatbot Veterinario Guiado

Sitio web estático moderno para la clínica veterinaria ficticia **VitaAnimal**, optimizado para desplegarse de manera directa e inmediata en **GitHub Pages** (100% HTML, CSS y JavaScript vainilla, sin backend, sin base de datos ni llamadas a APIs externas).

---

## 🌟 Características Principales

1. **Diseño Moderno & Identidad Visual**:
   - Paleta de colores personalizada (verde esmeralda, azul teal y tonos oscuros elegantes).
   - Modo claro / oscuro con toggle interactivo y persistencia en `localStorage`.
   - Responsive design adaptativo para escritorio, tablets y smartphones.
   - Tipografía moderna (*Outfit* y *Plus Jakarta Sans*) e integración del logo personalizado de la marca.

2. **🤖 Chatbot Veterinario Guiado (Diferencial del Proyecto)**:
   - **Widget Flotante**: Ubicado en la esquina inferior derecha con indicador de notificaciones y animación.
   - **Flujo Guiado por Botones**: Basado en un árbol de decisión interactivo almacenado en un archivo local JSON (`data/chatbot-tree.json`).
   - **Triage con Semáforo de Urgencia**: Muestra badges según el riesgo (🟢 **Baja**, 🟡 **Media**, 🔴 **Alta/Crítica**).
   - **Experiencia de Chat Real**:
     - Animación de *"El veterinario está escribiendo..."* con puntos de tipeo.
     - Burbujas de chat diferenciadas (bot vs. usuario).
     - Auto-scroll suave.
     - Botón de reinicio instantáneo de la conversación.
     - Acción directa **"Agendar Cita"** que desplaza automáticamente hacia la sección de contacto y pre-diligencia el formulario.
   - **Disclaimer Legal**: Mensaje visible aclarando que la herramienta ofrece orientación preventiva y no sustituye la atención presencial ni urgencias críticas.

3. **Secciones de la Landing Page**:
   - **Hero Section**: Titular atractivo, llamada a la acción dual y tarjeta flotante con información de urgencias 24/7.
   - **Sobre Nosotros**: Historia, filosofía, equipamiento técnico y características diferenciadoras.
   - **Servicios Integrales**: Tarjetas con badges (Consultas, Vacunas, Cirugía, Urgencias 24h, Estética, Animales Exóticos).
   - **Equipo Médico**: Perfiles profesionales con fotografías y especialidad.
   - **Contacto y Agendamiento**: Formulario interactivo con feedback y datos de contacto de la clínica.

---

## 📂 Estructura del Proyecto

```
VitaAnimal/
├── index.html               # Estructura principal semántica HTML5
├── css/
│   └── styles.css           # Sistema de diseño, variables CSS, modo oscuro y estilos del chatbot
├── js/
│   ├── main.js              # Lógica general (toggle de tema, menú hamburguesa, envío del formulario)
│   └── chatbot.js           # Motor del chatbot (lectura JSON, tipeo simulado, opciones, urgencia)
├── data/
│   └── chatbot-tree.json    # Árbol de decisiones y respuestas del chatbot guiado
├── assets/
│   ├── logo.png             # Logo oficial de VitaAnimal
│   ├── hero-bg.jpg          # Imagen principal del Hero
│   ├── vet-1.jpg            # Fotografía Dra. Elena Gómez
│   ├── vet-2.jpg            # Fotografía Dr. Carlos Mendoza
│   └── vet-3.jpg            # Fotografía Dra. Sofía Ramos
└── README.md                # Documentación del proyecto y guía de despliegue
```

---

## 🧠 Explicación Técnica de la Lógica del Chatbot

Toda la lógica del asistente virtual se compone de dos elementos fundamentales:

1. **La Base de Conocimiento JSON (`data/chatbot-tree.json`)**:
   Contiene un objeto JSON con la propiedad `nodes`. Cada nodo representa un paso o pantalla dentro del diálogo.
   - **Nodos de Pregunta**: Contienen un mensaje (`message`) y un arreglo de opciones (`options`) donde cada opción define el texto a mostrar y el id del siguiente nodo (`next`).
   - **Nodos de Resultado / Recomencación**: Contienen una evaluación médica básica, un nivel de urgencia (`urgency`: "Baja", "Media", "Alta"), un color identificador (`urgencyColor`: "success", "warning", "danger") y un botón de acción (`action`: "Agendar Cita").

2. **El Motor JavaScript (`js/chatbot.js`)**:
   - Realiza una petición asíncrona local (`fetch('data/chatbot-tree.json')`) al cargar.
   - Muestra una animación simulada de tipeo (`showTypingIndicator()`) con retraso calculado para dar la sensación de interacción humana real.
   - Genera dinámicamente las burbujas de diálogo y los botones de opción.
   - Permite reiniciar la conversación en cualquier momento con el botón 🔄.

---
