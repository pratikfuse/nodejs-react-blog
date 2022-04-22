import { ArticleRepository } from "../database/repositories/article.repository";
import { Service } from "typedi";
import { InjectRepository } from "../database/repositories/utils";
import { InjectCache } from "../cache/utils";
import { CacheService } from "../cache/cache";
import { v4 as uuidV4 } from "uuid";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "routing-controllers";

@Service()
export class ArticleService {
  constructor(
    @InjectRepository("Articles") private _articleRepository: ArticleRepository,
    @InjectCache() private _cacheService: CacheService
  ) {}

  async findArticles(query: any = {}) {
    const queryKeys = Object.keys(query).filter((k) => !!query[k]);
    const cacheKey = `articles_${
      queryKeys.length
        ? `${queryKeys.map((key) => `${key}:${query[key]}`).join("+")}`
        : ""
    }`;
    const articleCache = await this._cacheService.getCache(cacheKey);
    if (articleCache) {
      return JSON.parse(articleCache);
    }

    const articles = await this._articleRepository.findAllArticles(query);
    await this._cacheService.setCache(cacheKey, JSON.stringify(articles));
    return articles;
  }

  async createArticle(article: IArticle) {
    article.id = uuidV4();
    const response = await this._articleRepository.createArticle(article);
    return response;
  }

  async findArticleById(id: string) {
    const articleByIdCache = await this._cacheService.getCache("article_" + id);
    if (articleByIdCache) return JSON.parse(articleByIdCache);
    const article = await this._articleRepository.findArticleById(id);
    if (!article) {
      throw new NotFoundError();
    }
    await this._cacheService.setCache("article_" + id, JSON.stringify(article));
    return article;
  }

  async updateArticleById(
    id: string,
    title: string,
    articleContent: string,
    userId: string
  ) {
    const article = await this._articleRepository.findArticleById(id);
    if (!article) {
      throw new NotFoundError();
    }
    if (article.userId !== userId) {
      throw new UnauthorizedError();
    }

    const response = await this._articleRepository.updateArticleById(
      id,
      title,
      articleContent,
      userId
    );
    // invalidate existing cache
    await this._cacheService.invalidateCache("article_" + id);

    return response;
  }

  async deleteArticleById(id: string, userId: string) {
    const article = await this._articleRepository.findArticleById(id);
    if (!article) {
      throw new NotFoundError();
    }
    if (article.userId !== userId) {
      throw new UnauthorizedError();
    }
    const response = await this._articleRepository.deleteArticleById(
      id,
      userId
    );
    await this._cacheService.invalidateCache("article_" + id);
    return response;
  }
}
