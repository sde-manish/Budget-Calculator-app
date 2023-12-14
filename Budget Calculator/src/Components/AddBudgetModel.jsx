import { Button, Form, FormControl, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap"


function AddBudgetModel() {
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <ModalHeader closeButton>
                <ModalTitle>New Budget</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <FormControl type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    <Form.Label>Maximum Spending</Form.Label>
                    <FormControl type="number" required min={0} step={0.01} />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">Add</Button>
                </div>
            </ModalBody>
        </Form>
    </Modal>
    </>
  )
}

export default AddBudgetModel