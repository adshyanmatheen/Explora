import React, { useState, useEffect, useRef } from "react";
import { firestore } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Plus, CircleX, SquarePen, CircleCheck } from "lucide-react";

const ChecklistOverview = () => {
  const [checklistData, setChecklistData] = useState(null);
  const [newChecklist, setNewChecklist] = useState("");
  const [selectedTaskIndices, setSelectedTaskIndices] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");
  const editInputRef = useRef(null);
  const [shouldFocus, setShouldFocus] = useState(false);

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const docRef = doc(firestore, "Checklists", "checklist");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setChecklistData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching checklist:", error);
      }
    };

    fetchChecklist();
  }, []);

  const addChecklist = async () => {
    if (checklistData !== null && checklistData !== undefined) {
      try {
        const updatedTasks = checklistData.Tasks
          ? `${checklistData.Tasks}, ${newChecklist}`
          : newChecklist;

        await updateDoc(doc(firestore, "Checklists", "checklist"), {
          Tasks: updatedTasks,
        });

        const docRef = doc(firestore, "Checklists", "checklist");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setChecklistData(docSnap.data());
        } else {
          console.log("No such document!");
        }

        setNewChecklist("");
        console.log("Checklist updated successfully!");
      } catch (error) {
        console.error("Error updating checklist:", error);
      }
    } else {
      console.error("Checklist data is null or undefined");
    }
  };

  const handleTaskSelection = (index) => {
    setSelectedTaskIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  const deleteSelectedTasks = async () => {
    if (selectedTaskIndices.length === 0) return;

    if (checklistData !== null && checklistData !== undefined) {
      try {
        const tasksArray = checklistData.Tasks.split(", ").map(
          (task, index) => ({ task, index }),
        );
        const updatedTasks = tasksArray
          .filter((_, index) => !selectedTaskIndices.includes(index))
          .map(({ task }) => task)
          .join(", ");

        await updateDoc(doc(firestore, "Checklists", "checklist"), {
          Tasks: updatedTasks,
        });

        const docRef = doc(firestore, "Checklists", "checklist");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setChecklistData(docSnap.data());
        } else {
          console.log("No such document!");
        }

        setSelectedTaskIndices([]);
        console.log("Selected tasks deleted successfully!");
      } catch (error) {
        console.error("Error deleting tasks:", error);
      }
    } else {
      console.error("Checklist data is null or undefined");
    }
  };

  const tasksArray = checklistData?.Tasks
    ? checklistData.Tasks.split(", ").map((task, index) => ({ task, index }))
    : [];

  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
    setEditingTaskText(tasksArray[index].task);
    setShouldFocus(true);
  };

  const handleSaveEdit = async (index) => {
    if (checklistData !== null && checklistData !== undefined) {
      try {
        const updatedTasks = tasksArray
          .map((taskObj, i) => (i === index ? editingTaskText : taskObj.task))
          .join(", ");

        await updateDoc(doc(firestore, "Checklists", "checklist"), {
          Tasks: updatedTasks,
        });

        const docRef = doc(firestore, "Checklists", "checklist");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setChecklistData(docSnap.data());
        } else {
          console.log("No such document!");
        }

        setEditingTaskIndex(null);
      } catch (error) {
        console.error("Error saving edited task:", error);
      }
    } else {
      console.error("Checklist data is null or undefined");
    }
  };

  const handleDeleteTask = async (index) => {
    if (checklistData !== null && checklistData !== undefined) {
      try {
        const updatedTasks = tasksArray
          .filter((_, i) => i !== index)
          .map(({ task }) => task)
          .join(", ");

        await updateDoc(doc(firestore, "Checklists", "checklist"), {
          Tasks: updatedTasks,
        });

        const docRef = doc(firestore, "Checklists", "checklist");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setChecklistData(docSnap.data());
        } else {
          console.log("No such document!");
        }

        setEditingTaskIndex(null);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    } else {
      console.error("Checklist data is null or undefined");
    }
  };

  const handleBlur = () => {
    if (editingTaskIndex !== null) {
      handleSaveEdit(editingTaskIndex);
    }
  };

  useEffect(() => {
    if (shouldFocus && editInputRef.current) {
      editInputRef.current.focus();
      setShouldFocus(false);
    }
  }, [shouldFocus]);

  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-7 px-7 py-7 mobile:mx-auto mobile:max-w-sm md:max-w-lg md:p-10 md:px-11 md:py-11 lg:max-w-2xl dark:bg-black">
      <br />
      <div className="flex flex-col items-center justify-center">
        <h1 className="pb-5 font-primary text-4xl font-bold uppercase tracking-wide mobile:text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl dark:text-white">
          Checklists
        </h1>
        <h2 className="pb-6 font-primary text-2xl text-gray-500 mobile:text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl dark:text-gray-200">
          Stay Organised On Tasks While Traveling
        </h2>
      </div>
      <div className="py-12 pt-5">
        <div className="flex items-center justify-center">
          <input
            type="text"
            id="input"
            value={newChecklist}
            onChange={(e) => setNewChecklist(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addChecklist();
              }
            }}
            placeholder="Enter Your New Task"
            className="rounded-3xl bg-slate-200 p-2 px-36 font-primary text-lg outline-none placeholder:text-gray-600 mobile:px-5 mobile:text-base sm:text-base md:px-14 md:text-base lg:px-16 lg:text-lg xl:px-16 xl:text-lg dark:bg-slate-100 dark:placeholder:text-gray-600"
          />
          <button
            onClick={addChecklist}
            className="ml-3 rounded-full bg-black p-3 font-bold text-white hover:bg-getstarted-dark dark:bg-white dark:text-black dark:hover:bg-getstarted-light"
            data-testid="add-task-button"
          >
            <Plus className="mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-5 xl:w-5" />
          </button>
        </div>
        <div className="flex items-center px-3 py-10">
          <ul>
            {tasksArray.map(({ task, index }) => (
              <div
                key={index}
                className="flex items-center justify-between pb-5 pl-10 text-black dark:text-white"
              >
                <div className="flex-grow">
                  {editingTaskIndex === index ? (
                    <>
                      <input
                        ref={editInputRef}
                        type="text"
                        value={editingTaskText}
                        onChange={(e) => setEditingTaskText(e.target.value)}
                        onBlur={handleBlur}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSaveEdit(index);
                          }
                        }}
                        className="font-primary text-lg outline-none mobile:text-base sm:text-base md:text-base lg:text-lg xl:text-lg dark:bg-black dark:text-white"
                      />
                    </>
                  ) : (
                    <span className="font-primary text-lg capitalize mobile:text-base sm:text-base md:text-base lg:text-lg xl:text-lg">
                      {task}
                    </span>
                  )}
                </div>
                {editingTaskIndex === index ? (
                  <div className="flex gap-4 pl-20 mobile:gap-0 mobile:pl-0 lg:pl-20 xl:pl-20">
                    <button
                      onClick={() => handleSaveEdit(index)}
                      className="text-black hover:text-getstarted-dark dark:text-white"
                      data-testid="edit-task-button"
                    >
                      <CircleCheck className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6 dark:text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4 pl-44 mobile:pl-20 sm:pl-20 lg:pl-44 xl:pl-44">
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300"
                      data-testid="delete-task-button"
                    >
                      <CircleX className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
                    </button>
                    <button
                      onClick={() => handleEditTask(index)}
                      className="text-black hover:text-getstarted-dark dark:text-white"
                      data-testid="edit-task-button"
                    >
                      <SquarePen className="h-6 w-6 mobile:h-5 mobile:w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChecklistOverview;
