import React, { useCallback, useEffect, useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button';
import Loader from '../../components/Loader';
import { useApplication } from '../../hooks/applicationContext';
import { deleteArticleById, getArticleById } from '../../services/articleService';
import { showError, showSuccess, } from '../../utils/notify';


export const ArticleViewPage: React.FC = () => {

    const { articleId } = useParams<{ articleId: string }>();

    const [article, setArticle] = useState<IArticle>();
    const [loading, setLoading] = useState<boolean>();
    const [showDeleteModal, setDeleteModal] = useState<boolean>(false);

    const { userInfo } = useApplication();
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


    const handleDelete = async () => {
        if (!articleId) return;
        setLoading(true);
        const [error] = await deleteArticleById(articleId);
        if (error) {
            toast.success("Article delete successfully");
            showError("Error deleting article");
            setLoading(false);
            setDeleteModal(false);
            return;
        }

        showSuccess("Article delete successfully");
        setLoading(false);
        navigate('/');
    }

    return (
        <>
            {loading && <Loader />}
            <Card style={{
                margin: '1.5rem'
            }}>
                <Card.Header>{article?.username}</Card.Header>
                <Card.Body>
                    <Card.Title>{article?.title}</Card.Title>
                    <Card.Text>
                        {article?.body}
                    </Card.Text>
                    {userInfo && userInfo.id === article?.userId && <div className='d-flex justify-content-end'
                        style={{
                            marginTop: 10
                        }}>
                        <Button
                            onClick={() => navigate(`/post/${articleId}/edit`)}
                            className='btn btn-primary-outline' style={{
                                marginRight: 20
                            }}>Edit</Button>
                        <Button className='btn btn-danger' onClick={() => setDeleteModal(true)}>Delete</Button>
                    </div>
                    }
                </Card.Body>
            </Card>
            <br />

            <Modal show={showDeleteModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete this article ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteModal(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}