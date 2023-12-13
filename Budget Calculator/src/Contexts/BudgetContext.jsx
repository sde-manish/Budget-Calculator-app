import React, { useContext, useState } from "react";
import {v4 as uuidV4} from 'uuid'

const BudgetContext = React.createContext();

export function useBudget() {
  return useContext(BudgetContext);
}

// {
//     id:,
//     name:,
//     max:
// }
// {
//     id:,
//     budgetId:,
//     amount:,
//     description:,
// }

const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    function addExpense({budgetId, amount, description}){
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id:uuidV4(), amount, budgetId, description }]
        })
    }
    function addBudget({name, max}){
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, {id:uuidV4(), name, max}]
        })
    }
    function deleteBudget({id}){
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    function deleteExpenses({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }
  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpenses,
      }}
    >
      {" "}
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetProvider;
