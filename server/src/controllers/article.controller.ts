import { CreateArticleDto } from "../dtos/article.dto";
import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Post,
  Put,
  Req,
} from "routing-controllers";
import { ArticleService } from "../services/article.service";
import { Service } from "typedi";

@Service()
@JsonController("/articles")
export class ArticleController {
  constructor(private _articleService: ArticleService) {}

  @Get()
  async getArticles() {
    const response = await this._articleService.findArticles();
    return response;
  }

  @Post()
  @Authorized()
  async createArticle(
    @Body({
      validate: true,
    })
    article: CreateArticleDto
  ): Promise<any> {
    return [];
  }

  @Put()
  @Authorized()
  async updateArticle(
    @Body() article: Partial<CreateArticleDto>
  ): Promise<any> {
    return [];
  }
}
