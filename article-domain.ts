export default class Article {
  static fromMap(fromMap: any): Article {
    return new Article(
      fromMap["title"],
      fromMap["slug"],
      fromMap["content"],
      fromMap["url"],
      fromMap["author"],
      fromMap["image"],
    );
  }

  constructor(
    readonly title: string,
    readonly slug: string,
    readonly content: string,
    readonly url: string,
    readonly author: string,
    readonly image: string,
  ) {}
}
