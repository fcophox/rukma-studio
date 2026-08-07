# Migración a Kontorōru

Resumen de los cambios realizados para conectar rukma-studio a Kontorōru.

## Archivos Creados

### 1. `/src/lib/kontororu.ts`
Cliente de API para Kontorōru. Proporciona funciones para:
- `kontororu.posts.list()` — Listar posts publicados
- `kontororu.posts.bySlug(slug)` — Obtener post por slug
- `kontororu.categories.list()` — Listar categorías

### 2. `/src/components/BlogArticleView.tsx`
Componente de Server Component para mostrar un artículo individual.
Recibe el post ya fetcheado desde el servidor.

### 3. `/src/app/api/revalidate/kontororu/route.ts`
Endpoint de webhook que:
- Verifica la firma HMAC de Kontorōru
- Revalida el caché cuando se publica/actualiza/elimina contenido
- Maneja cambios de slug

### 4. `/.env.local`
Archivo de configuración con variables de entorno.

## Archivos Modificados

### `/src/app/blog/page.tsx`
- Cambio de `cms` a `kontororu`
- Obtiene posts con `kontororu.posts.list()`
- Mapea campos a la nueva estructura

### `/src/app/blog/[slug]/page.tsx`
- Cambio de `cms` a `kontororu`
- Obtiene post con `kontororu.posts.bySlug(slug)`
- Usa el nuevo componente `BlogArticleView`

## Pasos para Completar la Migración

### 1. Generar nuevas credenciales en Kontorōru

1. Ve a tu instalación de Kontorōru → **Ajustes → API Keys**
2. Crea una nueva API Key y cópiala
3. Ve a **Ajustes → Webhooks**
4. Crea un webhook con:
   - **URL:** `https://rukma.studio/api/revalidate/kontororu`
   - Copia el **Secret**

### 2. Actualizar `.env.local`

```bash
# En la raíz de rukma-studio

KONTORORU_API_KEY=kntr_live_xxxxxxxxxxxx.yyyyyyyyyyyyyy
KONTORORU_URL=https://tu-instalacion.kontororu.app/api/v1
KONTORORU_WEBHOOK_SECRET=tu_webhook_secret
```

### 3. Validar la integración

```bash
# Instalar dependencias (si no están)
npm install

# Ejecutar en desarrollo
npm run dev

# Ir a http://localhost:3000/blog
# Debería mostrar los posts de Kontorōru
```

### 4. Probar el webhook

1. Publica un nuevo post en Kontorōru
2. El webhook se ejecutará automáticamente
3. La página se revalidará sin necesidad de rebuild

## Posibles Problemas

### "KONTORORU_API_KEY no está configurada"
Verifica que `.env.local` exista y tenga la clave correcta.

### "401 Unauthorized" en los posts
- La API Key puede estar revocada o expirada
- Genera una nueva en Kontorōru → Ajustes → API Keys

### El webhook no se ejecuta
1. Verifica el secret en `KONTORORU_WEBHOOK_SECRET`
2. En Kontorōru, revisa los intentos de webhook en **Ajustes → Webhooks**

## Limpieza (Opcional)

Si ya no necesitas Supabase (UltraCMS), puedes:

1. Eliminar `/src/lib/cms.ts`
2. Eliminar `/src/components/BlogArticle.tsx` (si no se usa en otro lado)
3. Eliminar variables de Supabase de `.env.local`

## Estructura de Datos Kontorōru

```typescript
interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  seo: { title: string; description: string };
  customFields: Record<string, unknown>;
  category: { id: string; slug: string; name: string; kind: string };
  cover: { id: string; url: string; alt: string; width: number; height: number } | null;
  tags: Array<{ id: string; slug: string; name: string }>;
  locale?: string;
  translations?: Record<string, string>;
}

interface PostDetail extends Post {
  content: { html: string; json: unknown };
}
```

## Próximos Pasos

- [ ] Generar API Key en Kontorōru
- [ ] Crear webhook en Kontorōru
- [ ] Actualizar `.env.local`
- [ ] Probar en desarrollo
- [ ] Deploy a producción
- [ ] Verificar que los webhooks funcionen
