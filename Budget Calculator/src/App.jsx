import { useState, useContext } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";
import BudgetCard from "./Components/BudgetCard";
import BudgetsProvider, { useBudgets } from "./Contexts/BudgetContext";
import AddBudgetModel from "./Components/AddBudgetModel";
// import BudgetContext from './Contexts/BudgetContext'
function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const { budgets, getBudgetExpenses} = useBudgets();
  // const { budgets } = useContext(BudgetContext);
  console.log(budgets);

  return (
    <>
        <Container className="my-4">
          <Stack direction="horizontal" gap={2} className="mb-4">
            <h1 className="me-auto">Budget</h1>
            <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
            <Button variant="outline-primary">Add Expense</Button>
          </Stack>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(autofill,minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          ></div>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense)=>
            total + expense.amount, 0)
           return( <BudgetCard 
            key={budget.id}
            name={budget.name}
            amount={amount} 
            max={budget.max}/>
          )})}
          
        </Container>
        <AddBudgetModel show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
    </>
  );
}

export default App;
