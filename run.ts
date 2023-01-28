import epub from "https://deno.land/x/epubgen@0.5/mod.ts";
import { path } from "https://deno.land/x/epubgen@0.5/deps.ts";

import omnivoreClient from "./omnivore-client.ts";

async function readArticles() {
  const articles = await omnivoreClient(
    Deno.env.get("OMNIVORE_API_TOKEN") || Deno.args[0],
  );
  return articles;
}

const articles = await readArticles();

console.log(articles);

const date = new Date();

const options = {
  title: `Gazetka ${date}`,
  description: "Newsletter contains 10 articles from last 24 hour",
  author: "John",
  cover: path.toFileUrl(path.resolve("cover.jpg")).href,
};

epub(
  options,
  articles.map((art) => {
    return {
      title: art.title,
      content: art.content,
    };
  }),
).then(
  (content) => {
    Deno.writeFileSync("book.epub", content);
  },
  (err) => console.error("Failed to generate Ebook because of ", err),
);
