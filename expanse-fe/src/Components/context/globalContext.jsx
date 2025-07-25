import React, { useContext, useState } from "react"
import axiosInstance from "../../utils/api"

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axiosInstance.post(`add-income`, income)
            .catch((err) =>{
              setError(err.response?.data?.message || "Failed to add income");
            })
            getIncomes();
    }

    const getIncomes = async () => {
        const response = await axiosInstance.get(`get-incomes`)
        setIncomes(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axiosInstance.delete(`delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axiosInstance.post(`add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axiosInstance.get(`get-expenses`)
        setExpenses(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axiosInstance.delete(`delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            addExpense,
            transactionHistory,
            totalBalance,
            totalExpenses,
            getIncomes,
            totalIncome,
            deleteIncome,
            deleteExpense,
            getExpenses,
            incomes,
            expenses,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}