import { router } from "~/src/server/trpc";

import { beritaRouter } from "./berita";
import { postRouter } from "./post";

export const appRouter = router({
  post: postRouter,
  berita: beritaRouter,
});

export type AppRouter = typeof appRouter;
