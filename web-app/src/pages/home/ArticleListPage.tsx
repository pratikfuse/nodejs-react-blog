import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getArticles } from "../../services/articleService";
import Loader from "../../components/Loader";
import { showError } from "../../utils/notify";

export const ArticleListPage: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadArticles = async () => {
    setLoading(true);
    const [error, articles] = await getArticles();
    if (error) {
      showError('Error fetching articles')
    } else {
      setArticles(articles);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div className="wrapper">
      {loading && <Loader />}
      <div className="support-grid"></div>

      <div className="band">
        {
          articles.map((article, index) => (
            <div className={`item-${++index}`} key={article.id}>
              <Link to={`post/${article.id}`} className="card">
                <div className="thumb" style={{
                  background: `url(https://placehold.jp/3d4070/ffffff/500x500.png?text=${article.title})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}></div>
                <article>
                  <h1>{article.title}</h1>
                  <span>{article.body}</span>
                </article>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};
