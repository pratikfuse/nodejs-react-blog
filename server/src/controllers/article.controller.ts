import { CreateArticleDto, GetArticlesQuery } from "../dtos/article.dto";
import {
  Authorized,
  Body,
  Get,
  JsonController,
  Post,
  Put,
  QueryParams,
  Param,
  Delete,
  CurrentUser,
} from "routing-controllers";
import { ArticleService } from "../services/article.service";
import { Service } from "typedi";

@Service()
@JsonController("/articles")
export class ArticleController {
  constructor(private _articleService: ArticleService) {}

  @Get()
  async getArticles(
    @QueryParams({
      validate: true,
      required: true,
    })
    query: GetArticlesQuery
  ) {
    const searchQuery = {
      ...(query.body
        ? {
            body: query.body,
          }
        : {}),
      ...(query.title
        ? {
            title: query.title,
          }
        : {}),
    };

    const response = await this._articleService.findArticles(searchQuery);
    return response;
  }

  @Get("/:articleId")
  async getArticleById(
    @Param("articleId") articleId: string,
    @CurrentUser() user: any
  ) {
    const response = await this._articleService.findArticleById(
      articleId,
      user.id
    );
    return response;
  }

  @Post()
  @Authorized()
  async createArticle(
    @CurrentUser() user: IUser,
    @Body({
      validate: true,
    })
    article: CreateArticleDto
  ): Promise<any> {
    const response = await this._articleService.createArticle({
      userId: user.id,
      displayName: user.displayName,
      username: user.username,
      ...article,
    });
    return response;
  }

  @Put("/:articleId")
  @Authorized()
  async updateArticle(
    @Param("articleId") articleId: string,
    @Body() article: Partial<CreateArticleDto>,
    @CurrentUser() user: any
  ): Promise<any> {
    const response = await this._articleService.updateArticleById(
      articleId,
      article.title,
      article.body,
      user.id
    );
    return response;
  }

  @Delete("/:articleId")
  @Authorized()
  async deleteArticleById(
    @Param("articleId") articleId: string,
    @CurrentUser() user: any
  ) {
    const response = await this._articleService.deleteArticleById(
      articleId,
      user.id
    );
    return response;
  }
}
