import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { progress } from "@/db/schema";

export async function POST(req: Request) {
  const body = await req.json();
  const entityType = body?.entityType;
  const entityId = Number(body?.entityId);
  const done = Boolean(body?.done);

  if ((entityType !== "topic" && entityType !== "question") || !Number.isFinite(entityId)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const existing = await db
    .select()
    .from(progress)
    .where(and(eq(progress.entityType, entityType), eq(progress.entityId, entityId)))
    .limit(1);

  if (existing.length) {
    await db
      .update(progress)
      .set({ done, updatedAt: new Date() })
      .where(and(eq(progress.entityType, entityType), eq(progress.entityId, entityId)));
  } else {
    await db.insert(progress).values({ entityType, entityId, done });
  }

  return NextResponse.json({ ok: true, entityType, entityId, done });
}
