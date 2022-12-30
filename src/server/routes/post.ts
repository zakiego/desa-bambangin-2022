import { wp_posts, wp_terms, wp_users } from "@prisma/client";
import { z } from "zod";

import { prisma } from "~/src/lib/prisma";
import { procedure, router } from "~/src/server/trpc";
import paginationData, { PaginationData } from "~/src/utils/pagination";

export type GetAllPosts = {
  posts: Pick<
    wp_posts,
    "post_title" | "post_name" | "post_content" | "post_date"
  > &
    Pick<wp_terms, "name" | "slug"> &
    Pick<wp_users, "display_name"> & {
      thumbnail: string | null;
    };
  paging: PaginationData;
};

export const postRouter = router({
  getAllPosts: procedure
    .input(
      z.object({
        page: z.number(),
        category: z.string().optional(),
      }),
    )
    .query(async ({ input: { category, page } }) => {
      const offset = (page - 1) * 5;
      const limit = 5;

      if (category === undefined) {
        const data = await prisma.$queryRaw<GetAllPosts[]>`
      SELECT
          SQL_CALC_FOUND_ROWS
          wp_posts.post_title,
          wp_posts.post_name,
          wp_posts.post_content,
          wp_posts.post_date,
          wp_terms.name,
          wp_terms.slug,
          wp_users.display_name,
          wpm2.meta_value as thumbnail
       FROM wp_posts
          JOIN wp_term_relationships on wp_posts.ID = wp_term_relationships.object_id
          JOIN wp_terms on wp_term_relationships.term_taxonomy_id = wp_terms.term_id
          JOIN wp_term_taxonomy on wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id
          JOIN wp_users on wp_posts.post_author = wp_users.ID
          LEFT JOIN wp_postmeta wpm
             ON (wp_posts.ID = wpm.post_id AND wpm.meta_key = '_thumbnail_id')
          LEFT JOIN wp_postmeta wpm2
            ON (wpm.meta_value = wpm2.post_id AND wpm2.meta_key = '_wp_attached_file')
       WHERE wp_posts.post_status = 'publish'
       ORDER BY wp_posts.ID,wp_terms.slug
       LIMIT ${limit} OFFSET ${offset}`;

        const total_data = Number(
          (
            await prisma.$queryRaw<
              {
                LENGTH: number;
              }[]
            >`SELECT FOUND_ROWS() AS LENGTH`
          )[0]["LENGTH"] as number,
        );

        return {
          posts: data,
          paging: paginationData({ total_data, limit, page }),
        };
      }

      const data = await prisma.$queryRaw<GetAllPosts[]>`
      SELECT
          SQL_CALC_FOUND_ROWS
          wp_posts.post_title,
          wp_posts.post_name,
          wp_posts.post_content,
          wp_posts.post_date,
          wp_terms.name,
          wp_terms.slug,
          wp_users.display_name,
          wpm2.meta_value as thumbnail
       from wp_posts
          JOIN wp_term_relationships on wp_posts.ID = wp_term_relationships.object_id
          JOIN wp_terms on wp_term_relationships.term_taxonomy_id = wp_terms.term_id
          JOIN wp_term_taxonomy on wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id
          JOIN wp_users on wp_posts.post_author = wp_users.ID
          LEFT JOIN wp_postmeta wpm
             ON (wp_posts.ID = wpm.post_id AND wpm.meta_key = '_thumbnail_id')
          LEFT JOIN wp_postmeta wpm2
            ON (wpm.meta_value = wpm2.post_id AND wpm2.meta_key = '_wp_attached_file')
       WHERE wp_posts.post_status = 'publish' AND wp_terms.slug = ${category.toLowerCase()}
       ORDER BY wp_posts.ID,wp_terms.slug
       LIMIT ${limit} OFFSET ${offset}`;

      const total_data = Number(
        (
          await prisma.$queryRaw<
            {
              LENGTH: number;
            }[]
          >`SELECT FOUND_ROWS() AS LENGTH`
        )[0]["LENGTH"] as number,
      );

      return {
        posts: data,
        paging: paginationData({ total_data, limit, page }),
      };
    }),
});
