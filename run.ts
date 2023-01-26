import omnivoreClient from "./omnivore-client.ts";

async function readArticles() {
  const articles = await omnivoreClient(Deno.args[0]);
  return articles;
}

console.log(await readArticles());
