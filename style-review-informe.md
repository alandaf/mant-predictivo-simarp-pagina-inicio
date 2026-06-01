# Informe de Revisión de Estilo — mant-predictivo.simarp.net

**Fecha:** 01/jun/2026  
**URL:** https://mant-predictivo.simarp.net/  
**Tecnologías:** React 19 + Tailwind CSS v4 (Oklch) + Vite + Framer Motion  
**Idioma del sitio:** Español (Chile/América Latina)  

---

## 1. Metadatos y SEO

| # | Hallazgo | Gravedad | Detalle |
|---|----------|----------|---------|
| 1 | `lang="en"` incorrecto | 🔴 Alta | `<html lang="en">` pero todo el contenido está en español. Debe ser `lang="es"`. Afecta accesibilidad (lectores de pantalla) y SEO. |
| 2 | Sin `<meta name="description">` | 🔴 Alta | No hay meta description. Google mostrará un fragmento automático que puede no ser relevante. |
| 3 | Sin Open Graph / Twitter Cards | 🟡 Media | Faltan `og:title`, `og:description`, `og:image`, `twitter:card`. No hay vista previa al compartir en redes sociales. |
| 4 | Sin `<link rel="canonical">` | 🟡 Media | La página no declara URL canónica, lo que puede generar problemas de contenido duplicado. |
| 5 | Sin datos estructurados JSON-LD | 🟢 Baja | No hay Schema.org (Organization, SoftwareApplication, etc.) para motores de búsqueda. |

---

## 2. Clases de Color Inexistentes (⚠️ Crítico)

En Tailwind CSS v4, si un color no está definido en `@theme`, la clase se genera pero la variable no existe y el estilo **no se aplica**. Se detectaron **13 clases** que referencian colores fuera de la paleta compilada:

| Clase usada en JSX | ¿Existe en el CSS? | Efecto real |
|---|---|---|
| `text-cyan-455` | ❌ No | Sin estilo — el texto hereda el color del padre |
| `text-cyan-405` | ❌ No | Sin estilo |
| `text-cyan-450` | ❌ No | Sin estilo |
| `text-cyan-350` | ❌ No | Sin estilo |
| `text-slate-355` | ❌ No | Sin estilo |
| `text-slate-450` | ❌ No | Sin estilo |
| `text-slate-550` | ❌ No | Sin estilo |
| `bg-slate-850` | ❌ No | Sin estilo |
| `bg-slate-750` | ❌ No | Sin estilo |
| `bg-cyan-505` | ❌ No | Sin estilo |
| `border-slate-850` | ❌ No | Sin estilo |
| `placeholder-slate-650` | ❌ No | Sin estilo |
| `hover:bg-slate-850/80` | ❌ No | Sin estilo |
| `hover:bg-slate-750` | ❌ No | Sin estilo |

> **Posible causa:** Se editaron manualmente los sufijos numéricos (ej: `cyan-450` en lugar de `cyan-400` o `cyan-500`) o se definió una extensión de tema que no se incluyó en el build final.

---

## 3. Errores de Código

| # | Hallazgo | Ubicación | Detalle |
|---|----------|-----------|---------|
| 6 | Clase duplicada en botón hero | `Bj` → botón "Solicitar Reunión" | `hover:bg-cyan-505 hover:bg-cyan-500` — la segunda sobrescribe a la primera, y `cyan-505` no existe |
| 7 | Anchor links rotos en footer | Footer | Los enlaces `#problema` y `#solucion` no tienen destino. Solo existen `#calculadora`, `#beneficios`, `#valores`, `#contacto` en el DOM. |
| 8 | Imagen del remolcador no verificable | Hero | `src="/harbor_tugboat.png"` — no se pudo confirmar que el archivo exista en el servidor. |
| 9 | `referrerPolicy="no-referrer"` innecesario | Footer (logo) | La etiqueta `<img>` del logo tiene `referrerPolicy="no-referrer"` — bloquea cualquier analytics que use referrer. |

---

## 4. Accesibilidad (a11y)

| # | Hallazgo | Gravedad | Detalle |
|---|----------|----------|---------|
| 10 | Botones sin `type="button"` | 🟡 Media | Varios `<button>` carecen de `type="button"`. En formularios, un `<button>` sin type puede actuar como `submit`. |
| 11 | Sin skip-to-content | 🟡 Media | No hay enlace de salto al contenido principal para navegación por teclado. |
| 12 | Modales sin ARIA | 🟡 Media | El modal del simulador y el de contacto no tienen `role="dialog"`, `aria-modal="true"` ni `aria-labelledby`. |
| 13 | Icono semántico incorrecto | 🟢 Baja | Se usa un icono de audio/sonido (Lucide `AudioLines`) para representar alertas de WhatsApp en la sección Beneficios. |
| 14 | Contraste límite en texto pequeño | 🟡 Media | `text-slate-500` (#64748b) sobre `bg-slate-900` (#0f172b) da ~4.8:1 — justo en el límite para WCAG AA (4.5:1) en texto de 10-14px. |

---

## 5. Consistencia de Diseño

| # | Observación | Detalle |
|---|-------------|---------|
| 15 | 3 familias tipográficas | **Inter** (body), **Space Grotesk** (display), **JetBrains Mono** (mono). Correcto y bien diferenciado, pero Inter no tiene pesos por debajo de 300. |
| 16 | Tamaños de fuente ad-hoc | Se usan valores fuera de la escala: `9.5px`, `10px`, `10.5px`, `12.5px`, `13px`, `15px`. La jerarquía tipográfica pierde cohesión. |
| 17 | Letter-spacing excesivo | `tracking-[0.25em]` en etiquetas largas (español) dificulta la legibilidad. |
| 18 | Sin espaciado vertical consistente | Las secciones alternan entre `py-16` y `pb-16` sin un patrón claro. La sección de Beneficios no tiene padding superior definido en el padre. |
| 19 | Bordes mixtos sin criterio unificado | Se usa `border-slate-800`, `border-slate-900/60`, `border-slate-900/70`, `border-slate-900/80`, `border-slate-950/60` sin un sistema claro de jerarquía visual. |

---

## 6. Rendimiento

| # | Observación | Detalle |
|---|-------------|---------|
| 20 | Bundle JS monolítico | `index-DZvRLqEx.js` (~416KB minificado) contiene React, Framer Motion, Lucide React icons y toda la app. Sin code splitting por ruta ni por componente. |
| 21 | Sin lazy loading de componentes | El simulador, la calculadora ROI y el formulario de contacto se cargan en el bundle inicial sin división de código. |
| 22 | Imagen sin `loading="lazy"` | `<img src="/harbor_tugboat.png">` no difiere la carga. |
| 23 | Imagen sin dimensiones | La imagen del remolcador no tiene `width`/`height`, causando Cumulative Layout Shift (CLS). |

---

## 7. Resumen

| Categoría | 🔴 Alta | 🟡 Media | 🟢 Baja | Total |
|-----------|---------|----------|---------|-------|
| SEO / Metadatos | 2 | 2 | 1 | 5 |
| Clases de color inexistentes | 13 | — | — | **13** |
| Errores de código | — | 3 | 1 | 4 |
| Accesibilidad | — | 3 | 1 | 4 |
| Consistencia de diseño | — | 4 | 1 | 5 |
| Rendimiento | — | 3 | 1 | 4 |

**Total de hallazgos: ~35**

### Prioridades de acción

1. **🔴 Corregir las 13 clases de color inexistentes** — es el problema de mayor impacto visual. Revisar el theme de Tailwind y reemplazar por colores estándar de la paleta.
2. **🔴 Cambiar `lang="en"` a `lang="es"`** y agregar meta description.
3. **🟡 Agregar Open Graph / Twitter Cards** para compatibilidad con redes sociales.
4. **🟡 Arreglar los anchor links rotos** en el footer (`#problema`, `#solucion`).
5. **🟡 Agregar atributos ARIA a modales** y tipos a botones.
6. **🟢 Evaluar code splitting** para la calculadora ROI y el simulador.
