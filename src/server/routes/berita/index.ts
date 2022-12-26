import { z } from "zod";

import { procedure, router } from "~/src/server/trpc";
import fetchAPI from "~/src/utils/fetchAPI";

import { EdgeNode, Pokedex } from "./type";

export const beritaRouter = router({
  getAll: procedure.query(async () => {
    const data = await fetchAPI(
      `
    query BeritaGetAll {
      posts(where: {categoryName: "berita"}) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }`,
    );

    return data.posts;
  }),

  getDetail: procedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug } }) => {
      const data = await fetchAPI(
        `
    query BeritaGetAll {
      posts(where: {name: "${slug}"}) {
        edges {
          node {
            title
            excerpt
            slug
            date
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }`,
      );

      return data.posts;
    }),
});
