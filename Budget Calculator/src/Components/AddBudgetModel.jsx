import { useRef } from "react"
import { Button, Form, FormControl, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap"
import { useBudget } from "../Contexts/BudgetContext"


function AddBudgetModel({show, handleClose}) {
    const nameRef = useRef()
    const maxRef = useRef()
    const { addBudget} = useBudget()
    function handleSubmit(e){
        e.preventDefault()
        addBudget({
            name:nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        handleClose()
    }
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
                    <FormControl ref={nameRef} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    <Form.Label>Maximum Spending</Form.Label>
                    <FormControl ref={maxRef} type="number" required min={0} step={0.01} />
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