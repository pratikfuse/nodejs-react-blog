import { IsOptional, IsString } from "class-validator";

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  image?: string;
}

export class GetArticlesQuery {
  @IsOptional()
  title: string;

  @IsOptional()
  body: string;
}
