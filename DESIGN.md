# Project Design System

This file is the single source of truth for the project's design tokens.

## Colors

The following JSON block controls the color variables in the project. The watcher script will automatically inject these into `src/app/globals.css`.
Do not change the structure of the JSON block, only the color values.

```json
{
  "theme": {
    "colors": {
      "fondo-oscuro": "#0D0F12",
      "color-primario": "#0F2A2E",
      "color-secundario": "#3A464D",
      "color-terciario": "#B7CEC7",
      "fondo-claro": "#F2F4F6",
      "texto-secundario": "#8A9299",
      "texto-principal": "#1A1F23",
      "acento": "#DDE3E6"
    }
  }
}
```
