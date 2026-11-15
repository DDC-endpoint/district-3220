import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import kvIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache';
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';

/**
 * OpenNext's "small site using revalidation" setup, with the incremental
 * cache in Workers KV rather than R2 (R2 needs a payment method on the
 * account; decided 2026-11-15). Prerendered pages and the fetch cache live
 * in KV, and a Durable Object queue runs the time-based revalidations (the
 * calendar, hourly). No tag cache: nothing calls revalidateTag or
 * revalidatePath.
 */
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: doQueue,
  enableCacheInterception: true,
});
