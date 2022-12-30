import { prisma } from "~/src/lib/prisma";
import { procedure, router } from "~/src/server/trpc";

export const postRouter = router({
  getAllPosts: procedure.query(async () => {
    const data = await prisma.wp_posts.findMany();
    return data;
  }),
});
