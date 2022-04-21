import { Service } from "typedi";
import { BaseRepository } from "./base.repository";

interface IArticleRepository {
  findAllArticles(query: any): Promise<any>;
}

interface Article {
  id: string;
  userId: string;
  title: string;
  content: string;
}

@Service({
  factory: function (data: any) {
    return new ArticleRepository(data.id);
  },
})
export class ArticleRepository
  extends BaseRepository<Article>
  implements IArticleRepository
{
  constructor(tableName: string) {
    super(tableName);
  }

  findAllArticles(query: any): Promise<any> {
    return this.selectAll(query);
  }

  async findArticleById(id: string) {
    return this.selectOne({
      ArticleID: id,
    });
  }

  async updateArticleById(id: string, title: string, content: string) {}

  async deleteArticleById(id: string) {}
}
