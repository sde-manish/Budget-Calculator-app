import { useState } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";
import BudgetCard from "./Components/BudgetCard";
import BudgetProvider from "./Contexts/BudgetContext";

function App() {
  return (
    <>
      <BudgetProvider>
        <Container className="my-4">
          <Stack direction="horizontal" gap={2} className="mb-4">
            <h1 className="me-auto">Budget</h1>
            <Button variant="primary">Add Budget</Button>
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
          <BudgetCard name="Entertainment" amount={1100} max={1000} gray />
        </Container>
      </BudgetProvider>
    </>
  );
}

export default App;
