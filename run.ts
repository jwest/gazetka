import omnivoreClient from "./omnivore-client.ts";

async function readArticles() {
  const articles = await omnivoreClient(
    Deno.env.get("OMNIVORE_API_TOKEN") || Deno.args[0],
  );
  return articles;
}

console.log(await readArticles());
