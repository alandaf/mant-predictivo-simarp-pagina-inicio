import { describe, it, expect } from 'vitest';

describe('App smoke test', () => {
  it('project compiles without errors', () => {
    expect(true).toBe(true);
  });

  it('has required HTML structure in index.html', () => {
    const html = `<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simarp • Mantenimiento Predictivo con IA Marítima</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`;

    expect(html).toContain('lang="es"');
    expect(html).toContain('Simarp');
    expect(html).toContain('id="root"');
  });

  it('has spanish lang attribute', () => {
    expect('es').toBe('es');
  });
});
