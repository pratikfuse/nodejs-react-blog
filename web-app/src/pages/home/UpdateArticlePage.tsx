import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '../../components/Editor';
import Loader from '../../components/Loader';
import { getArticleById, updateArticle } from '../../services/articleService';
import { showError, showSuccess } from '../../utils/notify';

export const UpdateArticlePage: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const [article, setArticle] = useState<IArticle>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const navigate = useNavigate();

    const getArticle = useCallback(async (articleId: string) => {
        setLoading(true);
        const [error, response] = await getArticleById(articleId);
        if (error) showError('Error when fetching article');
        else {
            setArticle(response);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        articleId && getArticle(articleId)
    }, [articleId, getArticle])


    const handleSubmit = async (data: Pick<IArticle, 'body' | 'title'>) => {
        if (articleId) {
            setIsSaving(true);
            const [error] = await updateArticle(articleId, data);
            if (error) {
                showError('Error updating article');
            } else {
                showSuccess('Article updated successfully');
                navigate(`/post/${articleId}`);
            }

        }
    }
    if(loading) {
      return <Loader />
    }
    return (
          <Editor
              handleSubmit={handleSubmit}
              initialBody={article?.body}
              initialTitle={article?.title}
              isSaving={isSaving}
            />
        
    )
}