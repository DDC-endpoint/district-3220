import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';

/**
 * OpenNext's "small site using revalidation" setup: prerendered pages and the
 * fetch cache live in R2, and a Durable Object queue runs the time-based
 * revalidations (the calendar, hourly). No tag cache: nothing calls
 * revalidateTag or revalidatePath.
 */
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
  enableCacheInterception: true,
});
