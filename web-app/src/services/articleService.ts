import api from "./axios";

interface ICreateArticleResponse {}
export const createArticle = (content: Pick<IArticle, "body" | "title">) => {
  return api.post<Pick<IArticle, "body" | "title">, ICreateArticleResponse>(
    "/articles",
    content
  );
};

export const getArticles = () => {
  return api.get<IArticle[]>("/articles");
};

export const getArticleById = (articleId: string) => {
  return api.get<IArticle>(`/articles/${articleId}`);
};

export const updateArticle = (
  articleId: string,
  article: Pick<IArticle, "body" | "title">
) => {
  return api.put<any, any>(`/articles/${articleId}`, article);
};

export const deleteArticleById = (articleId: string) => {
  return api.delete(`/articles/${articleId}`);
};
