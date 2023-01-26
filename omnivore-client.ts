import {
  gql,
  request,
} from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";

import Article from "./article-domain.ts";

const SEARCH_UNREAD_QUERY: string = gql`
      query Search(
          $after: String
          $first: Int
          $query: String
          $includeContent: Boolean
          $format: String
      ) {
          search(
          after: $after
          first: $first
          query: $query
          includeContent: $includeContent
          format: $format
          ) {
          ... on SearchSuccess {
              edges {
              node {
                  slug
                  url
                  title
                  author
                  image
                  content
              }
              }
              pageInfo {
              hasNextPage
              endCursor
              totalCount
              }
          }
          ... on SearchError {
              errorCodes
          }
          }
      }
  `;

export default async function (token: string): Promise<Article[]> {
  const articlesRaw = await request(
    "https://api-prod.omnivore.app/api/graphql",
    SEARCH_UNREAD_QUERY,
    {
      after: "",
      first: 10,
      format: "markdown",
      includeContent: true,
      query: "",
    },
    {
      Cookie: `auth=${token};`,
    },
  );

  return articlesRaw.search.edges.map((item: Record<string, unknown>) =>
    item.node
  ).map(
    Article.fromMap,
  );
}
