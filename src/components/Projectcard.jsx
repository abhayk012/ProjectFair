import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { base_url } from '../services/baseurl';

function Projectcard({ project }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>

            <Card style={{ width: '18rem' }} onClick={handleShow} className='mt-5'>
                <Card.Img variant="top" src={`${base_url}/uploads/${project.projectimg}`} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    {/* <Card.Text>
                        Used Technologies: {project.languages}
                    </Card.Text> */}
                    <Button variant="primary">DETAILS</Button>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} lg={6}>
                            <img src={`${base_url}/uploads/${project.projectimg}`} width={"100%"} height={"250px"} alt="" />
                        </Col>
                        <Col md={6} lg={6}>
                            <h4>Description</h4>
                            <p>{project.overview}</p>
                            <h5 className='text-danger'>Used Technologies</h5>
                            <p>{project.languages}</p>
                        </Col>
                    </Row>
                    <div className='d-flex mt-3'>
                        <a href={project.website} target='_blank' style={{ color: "black", fontSize: "25px" }}>
                            <i class='fa-solid fa-link ms-3'></i>
                        </a>
                        <a href={project.github} target='_blank' style={{ color: "black", fontSize: "25px" }}>
                            <i class='fa-brands fa-github ms-3'></i>
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>



        </>
    )
}

export default Projectcard