import { IsOptional, IsString } from "class-validator";

export class CreateArticleDto {
  @IsOptional()
  userId: string;

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
