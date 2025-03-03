import React, { useContext, useEffect, useState } from 'react'
import { categories } from '../data/categories'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { BudgetDispatchContext, BudgetStateContext } from '../context/BudgetContext'
import ErrorMessage from './ErrorMessage'

export const ExpenseForm = () => {
    const [expense, setExpense] = useState({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date(),
    });
    const [error, setError] = useState('')
    const dispatch = useContext(BudgetDispatchContext)
    const state = useContext(BudgetStateContext)
    const totalExpenses = state.expenses.reduce((total, expense) => expense.amount + total, 0);
    const remainingBudget = state.budget - totalExpenses;

    useEffect(()=>{
        if(state.editingId){
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id===state.editingId)[0]
            setExpense(editingExpense)
        }
    }, [state.editingId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value,
        })
    }

    const handleChangeDate = (value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        const newExpenseAmount = expense.amount;
        if(state.editingId){
        const currentExpense = state.expenses.find(exp => exp.id === state.editingId);
        const previousAmount = currentExpense ? currentExpense.amount : 0;
        const adjustedRemainingBudget = remainingBudget + previousAmount;
        if (newExpenseAmount > adjustedRemainingBudget) {
            setError(`No puedes exceder el presupuesto disponible`);
            return;
        }
        dispatch({type: 'update-expense', payload: {expense:{id: state.editingId, ...expense}}})
        }
        else{
            if (newExpenseAmount > remainingBudget) {
                setError(`No puedes exceder el presupuesto disponible`);
                return;
            }
            dispatch({ type: 'add-expense', payload: { expense } })
        }
        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date(),
        })
        setError('');
    }

    return (
        <form className='space-y-5' onSubmit={handleSubmit}>
            <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
                {state.editingId ? 'Editar gasto': 'Nuevo gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className='flex flex-col gap-2'>
                <label htmlFor="expenseName" className='text-xl'>
                    Nombre gasto:
                </label>
                <input
                    type="text"
                    id='expenseName'
                    placeholder='Añade el nombre del gasto'
                    className='bg-slate-100 p-2'
                    name='expenseName'
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad:
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la Cantidad del gasto: ej. 300"
                    className=" bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>


            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Categoría:
                </label>
                <select
                    id="category"
                    className=" bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option> -- Seleccione --</option>
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>


            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Fecha Gasto:
                </label>
                <DatePicker
                    className=" bg-slate-100 p-2 border-0" value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>
            <input
                type="submit"
                className=" bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? 'Guardar cambios':'Registrar gasto'}

            />
        </form>
    )
}