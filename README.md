# Templates-Web — Sistema de Automatización y Calidad

Este repositorio centraliza diversos templates de desarrollo web. Para garantizar que el código subido sea de alta calidad y esté libre de errores de compilación, hemos implementado un sistema de validación automática utilizando **Husky**.

## 🚀 Conceptos Básicos de Git

Si eres nuevo en Git, aquí tienes una breve explicación de los comandos que utilizamos:

*   **`git add .`**: Este comando "prepara" (stages) todos los cambios que has realizado en tus archivos para el siguiente commit. El punto (`.`) indica que quieres incluir todo lo que ha cambiado en la carpeta actual y subcarpetas.
*   **`git commit -m "mensaje"`**: Crea un "punto de guardado" en la historia de tu proyecto. El mensaje debe describir qué cambios hiciste. 
    *   **Nota**: En este repositorio, este comando dispara automáticamente nuestras validaciones.

## 🐶 ¿Qué es Husky?

**Husky** es una herramienta que nos permite ejecutar scripts automáticamente en momentos clave de Git (conocidos como *Git Hooks*). En este proyecto, Husky actúa como un "guardián" de la calidad.

### ¿Qué analiza Husky en este repositorio?

Cada vez que ejecutas un `git commit` o un `git push`, Husky realiza las siguientes acciones:

1.  **Entra al proyecto**: Se desplaza automáticamente a la carpeta del proyecto activo (ej. `templates-cafeterias/cafeteria-nextjs`).
2.  **Ejecuta el Build (`pnpm build`)**: Inicia el proceso de compilación de Next.js.
    *   **¿Qué testea?**: Verifica que no haya errores de sintaxis, errores de TypeScript, componentes mal configurados o importaciones faltantes.
3.  **Resultado de la validación**:
    *   **Si el Build es exitoso (✅)**: El commit/push continúa normalmente.
    *   **Si el Build falla (❌)**: Husky detiene el proceso de Git y te muestra los errores. Deberás corregirlos antes de poder subir tus cambios. Esto evita que "rompas" el repositorio para otros colaboradores.

## 🛠️ Instalación y Uso

Para activar este sistema en tu entorno local, asegúrate de haber instalado las dependencias en la raíz:

```bash
# En la carpeta raíz (Templates-Web)
pnpm install
```

Si deseas validar manualmente un proyecto sin hacer commit, puedes usar el script que hemos creado:

```bash
# Dentro de la carpeta del proyecto específico
pnpm validar-push
```

---
*Desarrollado con enfoque en calidad y automatización premium.*
