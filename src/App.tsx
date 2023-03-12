import React, { useEffect, useState } from "react";
import AccountData from "./components/AccountSection/AccountData";
import Footer from "./components/Footer";
import Menu from "./components/Menu/Menu";
import TasksSection from "./components/TasksSection/TasksSection";
import ModalCreateTask from "./components/Utilities/ModalTask";
import { Task } from "./interfaces";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { modalActions } from "./store/Modal.store";
import { tasksActions } from "./store/Tasks.store";
import Img from "./assets/loading.gif";
const App: React.FC = () => {
	const modal = useAppSelector((state) => state.modal);

	const dispatch = useAppDispatch();

	const closeModalCreateTask = () => {
		dispatch(modalActions.closeModalCreateTask());
	};

	const createNewTaskHandler = (task: Task) => {
		dispatch(tasksActions.addNewTask(task));
	};
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="fixed w-full h-full top-0 left-0 flex justify-center align-center bg-white">
					<img src={Img} alt="" />
				</div>
			) : (
				<div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
					{modal.modalCreateTaskOpen && (
						<ModalCreateTask
							onClose={closeModalCreateTask}
							nameForm="Add a task"
							onConfirm={createNewTaskHandler}
						/>
					)}
					<Menu />
					<TasksSection />
					<Footer />
					<AccountData />
				</div>
			)}
		</>
	);
};

export default App;
