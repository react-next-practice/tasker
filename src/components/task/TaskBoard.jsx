import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
    const defaultTask = {
        id: crypto.randomUUID(),
        title: "Learn React Native",
        description:
            "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
        tags: ["web", "react", "js"],
        priority: "High",
        isFavorite: false,
    };

    // Define a state
    const [tasks, setTasks] = useState([defaultTask]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // handle Add Task Modal
    function handleAddTaskModal( newTask, isAdd ) {
        if( isAdd ){
            setTasks([...tasks, newTask]);
        }else{
            const updatedTasks = tasks.map((task) => {
                if (task.id === newTask.id) {
                    return newTask;
                }
                return task;
            });
            
            setTasks(updatedTasks);
        }

        setShowTaskModal(false);
    }

    // handle Edit Task
    function handleEditTask(task) {
        setTaskToEdit(task);
        setShowTaskModal(true);
    }

    // Handle close
    function handleOnCloseClick() {
        setShowTaskModal(false);
        setTaskToEdit(null);
    }

    // handle Delete Task
    function handleDeleteTask(taskId) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    }

    // handle Delete All Task
    function handeAllDelete() {
        tasks.length = 0;
        setTasks( [...tasks] );
    }

    // handle Favorite
    function handleFavorite( taskId ) {
        const updatedTasks = tasks.map( (task) => {
            if( task.id === taskId ){
                return {
                    ...task,
                    isFavorite: !task.isFavorite,
                }
            }
            return task;
        } );

        setTasks( updatedTasks );
    }
    
    return (
        <>
            <section className="mb-20" id="tasks">
                {showTaskModal && <AddTaskModal onCreateTask={handleAddTaskModal} taskToEdit={taskToEdit} onCloseClick={handleOnCloseClick} />}

                <div className="container">
                    <div className="p-2 flex justify-end">
                        <SearchTask />
                    </div>

                    <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                        <TaskActions onAddTask={() => setShowTaskModal(true)} onDeleteAllTask={handeAllDelete} />
                        <TaskList 
                            tasks={tasks} 
                            onEditTask={handleEditTask} 
                            onDeleteTask={handleDeleteTask} 
                            onFav={handleFavorite} />
                    </div>
                </div>
            </section>
        </>
    );
}
