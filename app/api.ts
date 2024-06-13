import { zValidator } from '@hono/zod-validator';
import { and, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import ShortUniqueId from 'short-unique-id';
import { db, insertPasteSchema, paste } from './core/schema';

const router = new Hono();
const suid = new ShortUniqueId();

const schema = insertPasteSchema.omit({
  createdAt: true,
  updatedAt: true
});

router.post(
  '/',
  zValidator(
    'json',
    schema.partial({
      slug: true,
      editKey: true,
      expiresAt: true
    })
  ),
  async (c) => {
    const { slug, content, editKey, expiresAt } = c.req.valid('json');

    if (slug) {
      const [result] = await db
        .select()
        .from(paste)
        .where(eq(paste.slug, slug))
        .limit(1)
        .execute();

      if (result && result.content) {
        throw new HTTPException(500, {
          message: 'Paste already exists.'
        });
      }
    }

    const textSize = new Blob([content]).size;

    if (textSize < 10) {
      throw new HTTPException(400, { message: 'Content is too small.' });
    }

    if (textSize > 1024 * 1024) {
      throw new HTTPException(400, { message: 'Content is too large.' });
    }

    const id = slug ?? suid.rnd();
    const key = editKey ?? suid.rnd();
    await db
      .insert(paste)
      .values({
        slug: id,
        content: content,
        editKey: key,
        expiresAt: expiresAt
      })
      .execute();

    return c.json({ slug: id, editKey: key });
  }
);

router.delete(
  '/',
  zValidator('json', schema.pick({ slug: true, editKey: true })),
  async (c) => {
    const { slug, editKey } = c.req.valid('json');
    const [result] = await db
      .select({ slug: paste.slug, editKey: paste.editKey })
      .from(paste)
      .where(and(eq(paste.slug, slug), eq(paste.editKey, editKey)))
      .limit(1)
      .execute();

    if (!result) {
      throw new HTTPException(429, { message: 'oops no match' });
    }

    await db.delete(paste).where(eq(paste.slug, slug)).execute();
    return c.json({ success: true });
  }
);

// biome-ignore lint/style/noDefaultExport: <explanation>
export default router;
