import { useState, useContext } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";
import BudgetCard from "./Components/BudgetCard";
import BudgetsProvider, { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./Contexts/BudgetContext";
import AddBudgetModel from "./Components/AddBudgetModel";
import AddExpenseModal from "./Components/AddExpenseModal";
import ViewExpensesModal from "./Components/ViewExpensesModal";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import TotalBudgetCard from "./Components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [ViewExpensesModalBudgetId, setViewExpensesModalBudgetId ] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses} = useBudgets();

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
        <Container className="my-4">
          <Stack direction="horizontal" gap={2} className="mb-4">
            <h1 className="me-auto">Budgets</h1>
            <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
            <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
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
            max={budget.max}
            onAddExpenseClick={()=>openAddExpenseModal(budget.id)}
            onViewExpensesClick={()=>setViewExpensesModalBudgetId(budget.id)}
            />
          )})}
          
        <UncategorizedBudgetCard onAddExpenseClick={()=>openAddExpenseModal()}
        onViewExpensesClick={()=>setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
        <TotalBudgetCard />
        </Container>
        <AddBudgetModel show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
        <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
        />
        <ViewExpensesModal budgetId ={ViewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
        />
        
    </>
  );
}

export default App;
