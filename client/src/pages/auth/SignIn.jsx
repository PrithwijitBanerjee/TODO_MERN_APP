import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { STATUSES } from "../../utils/statusObj"
import { useFormik } from "formik"
import { validation } from "../../utils/signInValidation"
import { useDispatch, useSelector } from "react-redux"
import { signInUsr } from "../../reducers/signInReducer"
import { useEffect } from "react"


const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, redirectTo } = useSelector(state => state.signInUsr);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validation,
        onSubmit: async (data, action) => {
            dispatch(signInUsr(data));
            action.resetForm();
        }
    });

    const redirectUsr = () => {
        if (localStorage.getItem('access_token') !== "" && localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') !== undefined) {
            navigate(redirectTo);
        }
    }

    useEffect(() => {
        redirectUsr();
    }, [redirectTo]);

    return (
        <Container className='vh-100 d-flex align-items-center justify-content-center'>
            <Row className='w-100'>
                <Col md={12} className='d-flex justify-content-center'>
                    <Card style={{ width: '30rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <Card.Body>
                            <Card.Title className='mb-3 text-primary'>Sign In Form</Card.Title>
                            <div> {/* Changed from Card.Text to div */}
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                        />
                                        <span className='text-danger mb-5'>{
                                            formik.errors && formik.touched.email && formik.errors.email
                                        }</span>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />
                                        <span className='text-danger mb-5'>{
                                            formik.errors && formik.touched.password && formik.errors.password
                                        }</span>
                                    </Form.Group>
                                    {
                                        status === STATUSES.LOADING ? (<Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>) : (<Button variant="primary" type="submit" className='my-2'>
                                            Sign In
                                        </Button>)
                                    }
                                    <Button variant="secondary" type="reset" className='my-2 mx-5' onClick={formik.handleReset}>
                                        Reset
                                    </Button>
                                    <div className='my-3'>
                                        New User? <Link to={'/signUp'}>sign up</Link>
                                    </div>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default SignIn