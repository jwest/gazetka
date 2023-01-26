import {
  gql,
  request,
} from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";

const query = gql`
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

const data = await request(
  "https://api-prod.omnivore.app/api/graphql",
  query,
  {
    after: "",
    first: 10,
    format: "markdown",
    includeContent: true,
    query: "",
  },
  {
    Cookie: `auth=${Deno.args[0]};`,
  },
);

console.log(data.search.edges);
