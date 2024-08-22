import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { Plus, CircleX, SquarePen, CircleCheck } from "lucide-react";

const ExpenseTrackerOverview = () => {
  const [newExpense, setNewExpense] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesList, setExpensesList] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTotalExpensesAndList = async () => {
      const financeDocRef = doc(firestore, "Finance", "finance");
      const docSnap = await getDoc(financeDocRef);

      if (docSnap.exists()) {
        const fetchedExpenses = docSnap.data().Expense || 0;
        const fetchedExpensesList = docSnap.data().ExpensesList || [];
        console.log("Fetched total expenses:", fetchedExpenses);
        console.log("Fetched expenses list:", fetchedExpensesList);
        setTotalExpenses(fetchedExpenses);
        setExpensesList(fetchedExpensesList);
      }
    };

    fetchTotalExpensesAndList();
  }, []);

  const addExpense = async () => {
    if (newExpense.trim() !== "") {
      const expenseAmount = parseFloat(newExpense);
      if (!isNaN(expenseAmount)) {
        const newTotalExpenses = totalExpenses + expenseAmount;
        const financeDocRef = doc(firestore, "Finance", "finance");
        const newExpenseEntry = { id: Date.now(), amount: expenseAmount };
        await setDoc(
          financeDocRef,
          {
            Expense: newTotalExpenses,
            ExpensesList: [...expensesList, newExpenseEntry],
          },
          { merge: true },
        );
        setTotalExpenses(newTotalExpenses);
        setNewExpense("");
        setExpensesList([...expensesList, newExpenseEntry]);
      } else {
        alert("Please enter a valid number.");
      }
    }
  };

  const editExpense = async (id, newAmount) => {
    const expenseToEdit = expensesList.find((expense) => expense.id === id);
    if (!expenseToEdit) return;

    const amountDifference = newAmount - expenseToEdit.amount;
    const newTotalExpenses = totalExpenses + amountDifference;

    const updatedExpensesList = expensesList.map((expense) =>
      expense.id === id ? { ...expense, amount: newAmount } : expense,
    );

    await setDoc(
      doc(firestore, "Finance", "finance"),
      {
        Expense: newTotalExpenses,
        ExpensesList: updatedExpensesList,
      },
      { merge: true },
    );

    setTotalExpenses(newTotalExpenses);
    setExpensesList(updatedExpensesList);
    setEditingExpense(null);
    setIsEditing(false);
  };

  const deleteExpense = async (id) => {
    const expenseToDelete = expensesList.find((expense) => expense.id === id);
    const newTotalExpenses = totalExpenses - expenseToDelete.amount;
    const updatedExpensesList = expensesList.filter(
      (expense) => expense.id !== id,
    );

    await setDoc(
      doc(firestore, "Finance", "finance"),
      {
        Expense: newTotalExpenses,
        ExpensesList: updatedExpensesList,
      },
      { merge: true },
    );

    setTotalExpenses(newTotalExpenses);
    setExpensesList(updatedExpensesList);
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 px-8 py-8 mobile:mx-auto mobile:max-w-sm md:max-w-lg md:p-10 md:px-11 md:py-11 lg:max-w-2xl dark:bg-black">
      <div className="flex flex-col items-center justify-center">
        <h1 className="pb-5 font-primary text-4xl font-bold uppercase tracking-wide mobile:text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl dark:text-white">
          Expense Tracker
        </h1>
        <h2 className="pb-6 font-primary text-2xl text-gray-500 mobile:text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl dark:text-gray-200">
          Track Where Your Expenses Are Used
        </h2>
      </div>
      <div className="flex items-center justify-center pt-5">
        <input
          type="text"
          id="input"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addExpense();
            }
          }}
          placeholder="Enter Your Expenses"
          className="rounded-3xl bg-slate-200 p-2 px-36 font-primary text-lg outline-none placeholder:text-gray-600 mobile:px-5 mobile:text-base sm:text-base md:px-14 md:text-base lg:px-16 lg:text-lg xl:px-16 xl:text-lg dark:bg-slate-100 dark:placeholder:text-gray-600"
        />
        <button
          onClick={addExpense}
          className="ml-3 rounded-full bg-black p-3 font-bold text-white hover:bg-getstarted-dark dark:bg-white dark:text-black dark:hover:bg-getstarted-light"
          data-testid="add-task-button"
        >
          <Plus className="mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-5 xl:w-5" />
        </button>
      </div>
      <div className="flex items-center justify-center pt-10">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-black px-12 py-3 text-white mobile:px-8 mobile:py-2 sm:px-8 sm:py-2 md:px-10 md:py-2 lg:px-12 lg:py-3 xl:px-12 xl:py-3 dark:bg-white">
          <h2 className="pb-2 text-xl font-semibold mobile:text-base sm:text-base md:text-lg lg:text-xl xl:text-xl dark:text-black">
            Total Expenses
          </h2>
          <h3 className="text-2xl font-bold mobile:text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl dark:text-black">
            ${totalExpenses.toFixed(2)}
          </h3>
        </div>
      </div>
      <div className="flex justify-center pt-6">
        <div className="w-full max-w-md">
          <h2 className="mb-5 flex items-center justify-center text-xl font-semibold dark:text-white">
            Expenses List
          </h2>
          <ul className="list-inside list-disc pl-2 pt-2">
            {expensesList.map((expense, index) => (
              <li
                key={expense.id}
                className="mb-2 flex items-center justify-between"
              >
                {isEditing && editingExpense.id === expense.id ? (
                  <>
                    <input
                      type="number"
                      value={editingExpense.amount}
                      onChange={(e) =>
                        setEditingExpense({
                          ...editingExpense,
                          amount: parseFloat(e.target.value),
                        })
                      }
                      className="font-primary text-lg outline-none mobile:text-base sm:text-base md:text-base lg:text-lg xl:text-lg dark:bg-black dark:text-white"
                    />
                    <button
                      onClick={() =>
                        editExpense(expense.id, editingExpense.amount)
                      }
                      className="mr-6 dark:text-white"
                    >
                      <CircleCheck className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="ml-2 mr-2 flex items-center ">
                      <p className="pb-2 mobile:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg dark:text-white">
                        <span className="font-semibold">
                          Expense {index + 1}:
                        </span>
                        <span className="pl-2">
                          ${expense.amount.toFixed(2)}
                        </span>
                      </p>
                      <div className="flex gap-4 pl-44 mobile:pl-20 sm:pl-20 lg:pl-44 xl:pl-44">
                        <button
                          onClick={() => {
                            setEditingExpense(expense);
                            setIsEditing(true);
                          }}
                          className="text-black dark:text-white"
                        >
                          <SquarePen className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
                        </button>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="text-red-500 hover:text-red-400 dark:text-red-400 hover:dark:text-red-300"
                        >
                          <CircleX className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTrackerOverview;
