import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '../../components/Editor';
import { createArticle } from '../../services/articleService';
import { showError, showSuccess } from '../../utils/notify';

export const CreateArticlePage: React.FC = () => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (data: Pick<IArticle, 'body' | 'title'>) => {
        setIsSaving(true);
        const [error] = await createArticle(data);
        if (error) showError('Error creating article');
        else {
            showSuccess('Article created successfully');
            navigate('/');
        }
    }

    return (
        <div>
            <Editor handleSubmit={handleSubmit} isSaving={isSaving} />
        </div>
    );
}