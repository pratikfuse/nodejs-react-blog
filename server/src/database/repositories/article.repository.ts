import { Service } from "typedi";
import { BaseRepository } from "./base.repository";
interface IArticleRepository {
  findAllArticles(query: any): Promise<any>;
}

@Service({
  factory: function (data: any) {
    return new ArticleRepository(data.id);
  },
})
export class ArticleRepository
  extends BaseRepository<IArticle>
  implements IArticleRepository
{
  constructor(tableName: string) {
    super(tableName);
  }

  findAllArticles(query: any): Promise<any> {
    return this.selectAll(query);
  }

  async findArticleById(id: string, userId: string) {
    return this.selectOne({
      id,
      userId,
    });
  }

  async createArticle(article: IArticle) {
    const response = await this.insert(article);
    return response;
  }

  async updateArticleById(
    id: string,
    title: string,
    body: string,
    userId: string
  ) {
    return this.update(
      {
        id,
        userId,
      },
      { title, body }
    );
  }

  async deleteArticleById(id: string, userId: string) {
    return await this.delete({
      id: id,
      userId,
    });
  }
}
