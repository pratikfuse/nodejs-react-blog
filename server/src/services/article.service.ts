import { ArticleRepository } from "../database/repositories/article.repository";
import { Service } from "typedi";
import { InjectRepository } from "../database/repositories/utils";
import { InjectCache } from "../cache/utils";
import { CacheService } from "../cache/cache";

@Service()
export class ArticleService {
  constructor(
    @InjectRepository("Articles") private _articleRepository: ArticleRepository,
    @InjectCache() private _cacheService: CacheService
  ) {}

  async findArticles(query: any = {}) {
    const articleCache = await this._cacheService.getCache("articles");
    if (articleCache) {
      return JSON.parse(articleCache);
    }
    const articles = await this._articleRepository.findAllArticles(query);
    await this._cacheService.setCache("articles", JSON.stringify(articles));
    return articles;
  }

  async findArticleById(id: string) {}
}
