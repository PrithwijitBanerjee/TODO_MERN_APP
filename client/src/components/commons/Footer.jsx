import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <>
            <footer className="bg-dark text-white py-4">
                <Container>
                    <Row>
                        <Col md={4}>
                            <h5>About Us</h5>
                            <p>
                                We are a company dedicated to providing the best service possible.
                                Our goal is to exceed customer expectations with every interaction.
                            </p>
                        </Col>
                        <Col md={4}>
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="/home" className="text-white">Home</a></li>
                                <li><a href="/services" className="text-white">Services</a></li>
                                <li><a href="/contact" className="text-white">Contact</a></li>
                                <li><a href="/about" className="text-white">About</a></li>
                            </ul>
                        </Col>
                        <Col md={4}>
                            <h5>Contact Us</h5>
                            <p>
                                123 Main Street<br />
                                Anytown, USA<br />
                                Email: info@example.com<br />
                                Phone: (123) 456-7890
                            </p>
                        </Col>
                    </Row>
                    <Row className="pt-3">
                        <Col className="text-center">
                            <p className="mb-0">&copy; 2024 Your Company. All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}

export default Footer