import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {withAuth0}  from "@auth0/auth0-react";



export class BookFormModal extends Component {
render() {
        return (
            <div>

                <Modal show={this.props.show} onHide={this.props.handelDisplayModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>BOOKS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e)=>this.props.addBook(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control 
                                type="text"   name="title" placeholder="Enter book name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control  name="description"
                               type="text" placeholder="Book Description" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text"  name="status" placeholder="Book Status" />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Add Book
  </Button>
  <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handelDisplayModal}>
              Close
            </Button>
          </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}


export default withAuth0(BookFormModal);