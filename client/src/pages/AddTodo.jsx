import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { addNewTodo } from '../reducers/todoReducer';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: '',
            desc: '',
            imgUrl: null,
            status: ''
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required(' **title is required'),
            desc: Yup.string().required(' **description is required'),
            imgUrl: Yup.mixed().required(' **image is required'),
            status: Yup.string().required(' **status is required')
        }),
        onSubmit: async (data, actions) => {
            const formData = new FormData();
            formData.append('title', data?.title);
            formData.append('desc', data.desc);
            formData.append('imgUrl', data.imgUrl);
            formData.append('status', data.status);
            const status = await dispatch(addNewTodo(formData));
            actions.resetForm();
            setImagePreview(null);
            if (status?.payload === 201) {
                navigate('/todo');
            }
        }
    });

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue("imgUrl", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };
    return (
        <>
            <Container className='vh-100 d-flex align-items-center justify-content-center'>
                <Row className='w-100'>
                    <Col md={12} className='d-flex justify-content-center'>
                        <Card style={{ width: '30rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                            <Card.Body>
                                <Card.Title className='mb-3 text-primary'>Add Todo Form</Card.Title>
                                <div>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formTitle">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Title"
                                                name="title"
                                                onChange={formik.handleChange}
                                                value={formik.values.title}
                                            />
                                            {formik.errors.title && formik.touched.title && (
                                                <span className='text-danger mb-5'>{formik.errors.title}</span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formDesc">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Description"
                                                name="desc"
                                                onChange={formik.handleChange}
                                                value={formik.values.desc}
                                            />
                                            {formik.errors.desc && formik.touched.desc && (
                                                <span className='text-danger mb-5'>{formik.errors.desc}</span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formImgUrl">
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                placeholder="Upload Image"
                                                name="imgUrl"
                                                onChange={handleImageChange}
                                            />
                                            {imagePreview && (
                                                <div className="mt-3">
                                                    <img src={imagePreview} alt="preview" width={100} height={100} />
                                                </div>
                                            )}
                                            {formik.errors.imgUrl && formik.touched.imgUrl && (
                                                <span className='text-danger mb-5'>{formik.errors.imgUrl}</span>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formStatus">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Select
                                                aria-label="Select Status"
                                                name="status"
                                                onChange={formik.handleChange}
                                                value={formik.values.status}
                                            >
                                                <option>Select Status</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </Form.Select>
                                            {formik.errors.status && formik.touched.status && (
                                                <span className='text-danger mb-5'>{formik.errors.status}</span>
                                            )}
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className='my-2'>
                                            Add New Todo
                                        </Button>
                                        <Button variant="secondary" type="reset" className='my-2 mx-5' onClick={() => { formik.resetForm(); setImagePreview(null); }}>
                                            Reset
                                        </Button>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AddTodo;
