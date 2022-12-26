import { z } from "zod";

import { procedure, router } from "~/src/server/trpc";
import fetchAPI from "~/src/utils/fetchAPI";

export const postRouter = router({
  getPreviewPost: procedure
    .input(
      z.object({
        id: z.string(),
        idType: z.string(),
      }),
    )
    .query(async ({ input: { id, idType } }) => {
      const data = await fetchAPI(
        `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
        {
          variables: { id, idType },
        },
      );
      return data.post;
    }),

  getAllPostsWithSlug: procedure.query(async () => {
    const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

    return data?.posts;
  }),

  getAllPostsForHome: procedure
    .input(
      z.object({
        preview: z.boolean().optional(),
      }),
    )
    .query(async ({ input: { preview } }) => {
      const data = await fetchAPI(
        `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
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
    }
  `,
        {
          variables: {
            onlyEnabled: !preview,
            preview,
          },
        },
      );

      return data?.postsas;
    }),

  // getPostAndMorePosts: procedure
  //   .input(
  //     z.object({
  //       slug: z.string(),
  //       preview: z.boolean().optional(),
  //       previewData: z.object({}).optional(),
  //     }),
  //   )
  //   .query(async ({ input: { slug, preview, previewData } }) => {
  //     const postPreview = preview && previewData?.post;
  //     // The slug may be the id of an unpublished post
  //     const isId = Number.isInteger(Number(slug));
  //     const isSamePost = isId
  //       ? Number(slug) === postPreview.id
  //       : slug === postPreview.slug;
  //     const isDraft = isSamePost && postPreview?.status === "draft";
  //     const isRevision = isSamePost && postPreview?.status === "publish";
  //     const data = await fetchAPI(
  //       `
  //   fragment AuthorFields on User {
  //     name
  //     firstName
  //     lastName
  //     avatar {
  //       url
  //     }
  //   }
  //   fragment PostFields on Post {
  //     title
  //     excerpt
  //     slug
  //     date
  //     featuredImage {
  //       node {
  //         sourceUrl
  //       }
  //     }
  //     author {
  //       node {
  //         ...AuthorFields
  //       }
  //     }
  //     categories {
  //       edges {
  //         node {
  //           name
  //         }
  //       }
  //     }
  //     tags {
  //       edges {
  //         node {
  //           name
  //         }
  //       }
  //     }
  //   }
  //   query PostBySlug($id: ID!, $idType: PostIdType!) {
  //     post(id: $id, idType: $idType) {
  //       ...PostFields
  //       content
  //       ${
  //         // Only some of the fields of a revision are considered as there are some inconsistencies
  //         isRevision
  //           ? `
  //       revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
  //         edges {
  //           node {
  //             title
  //             excerpt
  //             content
  //             author {
  //               node {
  //                 ...AuthorFields
  //               }
  //             }
  //           }
  //         }
  //       }
  //       `
  //           : ""
  //       }
  //     }
  //     posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
  //       edges {
  //         node {
  //           ...PostFields
  //         }
  //       }
  //     }
  //   }
  // `,
  //       {
  //         variables: {
  //           id: isDraft ? postPreview.id : slug,
  //           idType: isDraft ? "DATABASE_ID" : "SLUG",
  //         },
  //       },
  //     );

  //     // Draft posts may not have an slug
  //     if (isDraft) data.post.slug = postPreview.id;
  //     // Apply a revision (changes in a published post)
  //     if (isRevision && data.post.revisions) {
  //       const revision = data.post.revisions.edges[0]?.node;

  //       if (revision) Object.assign(data.post, revision);
  //       delete data.post.revisions;
  //     }

  //     // Filter out the main post
  //     data.posts.edges = data.posts.edges.filter(
  //       ({ node }) => node.slug !== slug,
  //     );
  //     // If there are still 3 posts, remove the last one
  //     if (data.posts.edges.length > 2) data.posts.edges.pop();

  //     return data;
  //   }),
});
