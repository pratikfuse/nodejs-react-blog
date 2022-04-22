import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from './Button';

interface IEditorProps {
    handleSubmit: (data: Pick<IArticle, 'body' | 'title'>) => void;
    initialBody?: string;
    initialTitle?: string;
    isSaving?: boolean;
}

export const Editor: React.FC<IEditorProps> = ({
    handleSubmit,
    initialBody,
    initialTitle,
    isSaving
}) => {

    const [body, setBody] = useState<string>(initialBody || "");
    const [title, setTitle] = useState<string>(initialTitle || "");

    return (
        <div className='d-flex flex-column justify-content-md-between' style={{
            padding: '1.5rem'
        }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="email" placeholder="title" onChange={e => setTitle(e.target.value)} value={title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={10} onChange={e => setBody(e.target.value)} value={body} />
            </Form.Group>
            <Button onClick={() => handleSubmit({
                body: body,
                title: title
            })} isLoading={isSaving} disabled={!body.length || !title.length}>Save</Button>
        </div>)
}