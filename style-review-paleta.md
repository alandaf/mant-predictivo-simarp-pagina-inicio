# Análisis de Paleta de Colores vs. Industria de Mantenimiento Predictivo

**Fecha:** 01/jun/2026  
**Sitio:** https://mant-predictivo.simarp.net/  
**Referencia:** Competidores analizados: Tractian, Augury, KCF Technologies, Sensorfy, Nanoprecise, I-care Group

---

## 1. Comparativa con la Industria

| Aspecto | Simarp (actual) | Tractian | Augury | KCF Tech | ¿Alineado? |
|---------|----------------|----------|--------|----------|------------|
| Fondo | Slate-950 (#020618) | Gris azulado oscuro | Blanco + azul | Blanco + azul marino | ✅ Sí |
| Acento primario | Cyan-500 (#00b7d7) | Azul índigo (#3b82f6) | Verde azulado (#0d9488) | Azul (#2563eb) | ✅ Sí |
| Acento éxito | Emerald (#00bb7f) | Verde (#22c55e) | Verde | Verde | ✅ Sí |
| Acento peligro | Rose/Red (#ff2357) | Rojo (#ef4444) | Rojo | Rojo | ✅ Sí |
| Modo oscuro | Nativo | Sí | No (light) | No (light) | ✅ Diferenciador |
| Glasstrofismo | Sí | Sí (sutil) | No | No | ✅ Diferenciador |

**Veredicto:** La paleta **sí está alineada** con las convenciones de la industria. El azul/cian es el color dominante en mantenimiento predictivo industrial (transmite confianza, precisión, tecnología). El modo oscuro los diferencia de competidores light-mode como Augury y KCF.

---

## 2. Psicología del Color — ¿Por qué funciona?

| Color | Significado | Aplicación en el sitio | ¿Apropiado? |
|-------|------------|----------------------|-------------|
| **Slate oscuro** (#020618) | Autoridad, solidez, fondo técnico | Fondo principal | ✅ Transmite seriedad industrial |
| **Cyan brillante** (#00b7d7) | Tecnología, precisión, agua/océano, limpieza | Botones, acentos, glows | ✅ **Perfecto para marítimo** — el cyan evoca el mar y la alta tecnología |
| **Emerald** (#00bb7f) | Éxito, confianza, crecimiento | Estados OK, ROI positivo | ✅ Estándar |
| **Orange** (#fe6e00) | Alerta, atención, calor | Advertencias, estados de motor | ✅ Apropiado para temperatura/maquinaria |
| **Rose** (#ff2357) | Peligro, error crítico | Alarmas, errores | ✅ Estándar |

El **cyan es especialmente acertado** para un producto marítimo: conecta visualmente con el océano y la industria naval, a la vez que comunica alta tecnología.

---

## 3. Tendencias 2025-2026 que el sitio cumple

| Tendencia | ¿Lo aplica? | Evidencia |
|-----------|------------|-----------|
| Dark mode como default | ✅ Sí | Slate-950 fondo completo |
| Glassmorphism / backdrop blur | ✅ Sí | `backdrop-blur-md`, `bg-slate-950/70` |
| Bento grids | ✅ Sí | Grid de 12 columnas en lg |
| Tipografía de alto contraste | ✅ Sí | Inter + Space Grotesk |
| Bordes de 1px con opacidad | ✅ Sí | `border-slate-800`, `border-cyan-500/10` |
| Glows / sombras coloreadas | ✅ Sí | `shadow-cyan-950/20`, glows hover |
| UI densa y rica en datos | ✅ Sí | Calculadora ROI, tarjetas de beneficio |
| Gradientes sutiles | ✅ Sí | `from-cyan-500/10 via-slate-950 to-transparent` |
| Animaciones micro | ✅ Sí | Scale on hover, translate, pulse |

---

## 4. Áreas de Mejora

### 4.1 Problemas de ejecución (no de concepto)

| # | Problema | Recomendación |
|---|----------|--------------|
| A | Clases de color inexistentes (`cyan-455`, `cyan-405`, `slate-850`, etc.) | Reemplazar por colores existentes de la paleta Tailwind (`cyan-400`, `cyan-500`, `slate-800`, `slate-900`) |
| B | `hover:bg-cyan-505` duplicado | Cambiar a `hover:bg-cyan-500` (consistente con el resto del sitio) |
| C | Sin un solo token semántico de color | Definir tokens: `--color-primary`, `--color-surface`, `--color-accent` |

### 4.2 Refinamientos opcionales

| # | Sugerencia | Justificación |
|---|-----------|--------------|
| D | **Agregar un toque de azul marino** (#1e40af) como terciario | Conecta aún más con identidad marítima; útil para backgrounds de dashboard |
| E | **Reducir opacidad del grid pattern** de 0.25 a 0.15 | El patrón de cuadrícula actual puede competir con el contenido en algunas secciones |
| F | **Unificar bordes de tarjetas** en un solo estándar | Actualmente se mezclan `border-slate-800`, `border-slate-900/60`, `border-cyan-500/10` sin jerarquía clara |
| G | **Reemplazar glows azules brillantes** por glows verde-azulados marinos | Ej: `shadow-cyan-950/30` → `shadow-teal-950/30` con un teal más oceánico |

### 4.3 Paleta sugerida (ajuste fino)

```
// Manteniendo el espíritu actual, pero con colores estándar de Tailwind v4:

--color-primary:          cyan-500     (#00b7d7)  // Acento principal
--color-primary-hover:    cyan-400     (#22d3ee)
--color-bg-primary:       slate-950    (#020618)  // Fondo principal
--color-bg-surface:       slate-900    (#0f172b)  // Tarjetas
--color-bg-elevated:      slate-800    (#1e293b)  // Superficies elevadas
--color-border:           slate-800/60            // Bordes estándar
--color-border-accent:    cyan-500/20             // Bordes con acento
--color-text-primary:     white        (#ffffff)  // Títulos
--color-text-body:        slate-300    (#cbd5e1)  // Cuerpo
--color-text-muted:       slate-400    (#94a3b8)  // Secundario
--color-success:          emerald-500  (#00bb7f)
--color-warning:          orange-500   (#fe6e00)
--color-danger:           rose-500     (#ff2357)
--color-maritime:         sky-700      (#0369a1)  // Nuevo: acento marítimo terciario
```

---

## 5. Veredicto Final

**✅ La paleta actual es adecuada para una landing page de mantenimiento predictivo marítimo y no necesita un cambio radical.**

El esquema **dark slate + cyan** está perfectamente alineado con:
- Las tendencias 2025-2026 de diseño SaaS industrial
- Los competidores directos (Tractian, Augury, KCF)
- La identidad marítima (cyan = océano + tecnología)
- La psicología del color para B2B industrial (confianza, precisión, autoridad)

**Lo que realmente necesita corrección son los problemas de ejecución** (13 clases de color inexistentes, anchor links rotos, metadatos faltantes). La paleta en sí misma es sólida y diferenciadora.

> **Conclusión:** No cambiar la paleta. Arreglar la implementación.
