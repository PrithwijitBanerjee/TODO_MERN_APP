import { useFormik } from 'formik';
import { validation } from '../../utils/signUpvalidation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { STATUSES } from '../../utils/statusObj';
import { Spinner } from 'react-bootstrap';
import { clearReg, signUpUsr } from '../../reducers/signUpReducer';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { redirectReg, status, error } = useSelector(state => state.signUpUsr);
    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            phoneNo: '',
            password: '',
            role: ''
        },
        validationSchema: validation,
        onSubmit: async (data, action) => {
            let formData = null;
            if (data?.role?.length) {
                formData = {
                    userName: data.userName,
                    email: data.email,
                    phoneNo: data.phoneNo,
                    password: data.password,
                    role: data.role
                };
            } else {
                formData = {
                    userName: data.userName,
                    email: data.email,
                    phoneNo: data.phoneNo,
                    password: data.password,
                };
            }
            dispatch(signUpUsr(formData));
            action.resetForm();
        }
    });
    const redirectUsr = () => {
        if (redirectReg === "/signIn") {
            navigate(redirectReg);
        }
    }

    useEffect(() => {
        redirectUsr();
        return () => { // clean up function ...
            dispatch(clearReg());
        }
    }, [redirectReg]);

    if (error) {
        return (<div className='vh-100 justify-content-center align-items-center'>
            <h2 className='text-danger'>Something went Wrong !!!</h2>
        </div>)
    }

    return (
        <Container className='vh-100 d-flex align-items-center justify-content-center'>
            <Row className='w-100'>
                <Col md={12} className='d-flex justify-content-center'>
                    <Card style={{ width: '30rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <Card.Body>
                            <Card.Title className='mb-3 text-primary'>Sign Up Form</Card.Title>
                            <div> {/* Changed from Card.Text to div */}
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter User Name"
                                            name="userName"
                                            onChange={formik.handleChange}
                                            value={formik.values.userName}
                                        />
                                        <span className='text-danger mb-5'>{
                                            formik.errors && formik.touched.userName && formik.errors.userName
                                        }</span>
                                    </Form.Group>
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
                                    <Form.Group className="mb-3" controlId="formBasicPhone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Enter Phone No"
                                            name="phoneNo"
                                            onChange={formik.handleChange}
                                            value={formik.values.phoneNo}
                                        />
                                        <span className='text-danger mb-5'>{
                                            formik.errors && formik.touched.phoneNo && formik.errors.phoneNo
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
                                    <Form.Group className="mb-3" controlId="formBasicRole">
                                        <Form.Label>Select Role</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            name="role"
                                            onChange={formik.handleChange}
                                            value={formik.values.role}
                                        >
                                            <option>Select User Role</option>
                                            <option value="regular">Regular</option>
                                            <option value="admin">Admin</option>
                                        </Form.Select>
                                        <span className='text-danger mb-5'>{
                                            formik.errors && formik.touched.role && formik.errors.role
                                        }</span>
                                    </Form.Group>
                                    {
                                        status === STATUSES.LOADING ? (<Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>) : (<Button variant="primary" type="submit" className='my-2'>
                                            Sign Up
                                        </Button>)
                                    }
                                    <Button variant="secondary" type="reset" className='my-2 mx-5' onClick={formik.handleReset}>
                                        Reset
                                    </Button>
                                    <div className='my-3'>
                                        Already have an account? <Link to={'/signIn'}>sign in</Link>
                                    </div>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default SignUp;
