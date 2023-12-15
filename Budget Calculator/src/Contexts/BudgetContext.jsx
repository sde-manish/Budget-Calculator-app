import React, { useContext, useState } from "react";
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from "../Hooks/useLocalStorage";

const BudgetContext = React.createContext();

export function useBudget() {
  return useContext(BudgetContext);
}


const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets",[])
    const [expenses, setExpenses] = useLocalStorage("expenses",[])
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
      // ToDo: deal with expenses
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
