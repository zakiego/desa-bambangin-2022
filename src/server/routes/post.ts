import { wp_posts, wp_terms, wp_users } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { omit } from "lodash";
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
        limit: z.number().optional(),
      }),
    )
    .query(async ({ input: { category, page, limit = 5 } }) => {
      const offset = (page - 1) * limit;

      if (category === undefined) {
        const data = await prisma.$queryRaw<GetAllPosts["posts"][]>`
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

      const data = await prisma.$queryRaw<GetAllPosts["posts"][]>`
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

  getPostDetail: procedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input: { slug } }) => {
      const data = await prisma.wp_posts.findFirst({
        where: {
          post_name: slug,
        },
        select: {
          ID: true,
          post_title: true,
          post_content: true,
          post_date: true,
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An unexpected error occurred, please try again later.",
        });
      }

      const thumbnailId = await prisma.wp_postmeta.findFirst({
        where: {
          post_id: data.ID,
          meta_key: "_thumbnail_id",
        },
        select: {
          meta_value: true,
        },
      });

      if (!thumbnailId?.meta_value) {
        return { ...omit(data, "ID"), thumbnail: null };
      }

      const thumbnail = await prisma.wp_postmeta.findFirst({
        where: {
          post_id: parseInt(thumbnailId.meta_value),
          meta_key: "_wp_attached_file",
        },
        select: {
          meta_value: true,
        },
      });

      if (!thumbnail?.meta_value) {
        return { ...omit(data, "ID"), thumbnail: null };
      }

      return { ...omit(data, "ID"), thumbnail: thumbnail.meta_value };
    }),

  // getAllSlug: procedure.query(async () => {
  //   const data = await prisma.wp_posts.findMany({
  //     where: {
  //       post_status: "publish",
  //     },
  //     select: {
  //       post_name: true,
  //     },
  //   });

  //   return data;
  // }),
});
