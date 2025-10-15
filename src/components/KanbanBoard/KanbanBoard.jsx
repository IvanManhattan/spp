// components/KanbanBoard/KanbanBoard.jsx
import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ project, onTaskUpdate }) => {
	const [tasks, setTasks] = useState(project.tasks || []);
	const [editingTask, setEditingTask] = useState(null);

	const columns = [
		{ id: 'todo', title: 'To Do', color: '#6c757d' },
		{ id: 'inProgress', title: 'In Progress', color: '#007bff' },
		{ id: 'done', title: 'Done', color: '#28a745' }
	];

	const handleTaskMove = (taskId, newStatus) => {
		const updatedTasks = tasks.map(task =>
			task.id === taskId ? { ...task, status: newStatus } : task
		);

		setTasks(updatedTasks);
		if (onTaskUpdate) {
			onTaskUpdate(updatedTasks);
		}
	};

	const handleAddTask = (columnId, task) => {
		const newTask = {
			...task,
			id: Date.now().toString(),
			status: columnId,
			createdAt: new Date()
		};

		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);

		if (onTaskUpdate) {
			onTaskUpdate(updatedTasks);
		}
	};

	const handleDeleteTask = (taskId) => {
		const updatedTasks = tasks.filter(task => task.id !== taskId);
		setTasks(updatedTasks);

		if (onTaskUpdate) {
			onTaskUpdate(updatedTasks);
		}
	};

	// Функция редактирования
	const handleEditTask = (task) => {
		setEditingTask(task);
	};

	// Функция сохранения изменений
	const handleUpdateTask = (updatedTask) => {
		const updatedTasks = tasks.map(task =>
			task.id === updatedTask.id ? updatedTask : task
		);

		setTasks(updatedTasks);
		setEditingTask(null);

		if (onTaskUpdate) {
			onTaskUpdate(updatedTasks);
		}
	};

	return (
		<div className="kanban-board">
			{/* Заголовок проекта */}
			<div style={{
				marginBottom: '2rem',
				padding: '1.5rem',
				backgroundColor: '#f8f9fa',
				borderRadius: '8px'
			}}>
				<h1 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
					{project.title}
				</h1>
				<p style={{ margin: '0 0 1rem 0', color: '#666' }}>
					{project.description}
				</p>
			</div>

			{/* Kanban доска */}
			<div style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
				gap: '1.5rem'
			}}>
				{columns.map(column => (
					<KanbanColumn
						key={column.id}
						column={column}
						tasks={tasks.filter(task => task.status === column.id)}
						onTaskMove={handleTaskMove}
						onAddTask={handleAddTask}
						onDeleteTask={handleDeleteTask}
						onEditTask={handleEditTask} // Передаем функцию редактирования
					/>
				))}
			</div>

			{/* Модальное окно редактирования */}
			{editingTask && (
				<EditTaskModal
					task={editingTask}
					onSave={handleUpdateTask}
					onCancel={() => setEditingTask(null)}
				/>
			)}
		</div>
	);
};

// Компонент модального окна редактирования
const EditTaskModal = ({ task, onSave, onCancel }) => {
	const [formData, setFormData] = useState(task);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};

	const handleChange = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	return (
		<div style={{
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'rgba(0,0,0,0.5)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			zIndex: 1000
		}}>
			<div style={{
				backgroundColor: 'white',
				padding: '2rem',
				borderRadius: '8px',
				width: '90%',
				maxWidth: '500px'
			}}>
				<h3 style={{ margin: '0 0 1.5rem 0' }}>Редактировать задачу</h3>

				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: '1rem' }}>
						<label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
							Название:
						</label>
						<input
							type="text"
							value={formData.content}
							onChange={(e) => handleChange('content', e.target.value)}
							style={{
								width: '100%',
								padding: '0.5rem',
								border: '1px solid #ddd',
								borderRadius: '4px',
								fontSize: '1rem'
							}}
							required
						/>
					</div>

					<div style={{ marginBottom: '1rem' }}>
						<label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
							Описание:
						</label>
						<textarea
							value={formData.description}
							onChange={(e) => handleChange('description', e.target.value)}
							style={{
								width: '100%',
								padding: '0.5rem',
								border: '1px solid #ddd',
								borderRadius: '4px',
								fontSize: '1rem',
								minHeight: '100px',
								resize: 'vertical'
							}}
						/>
					</div>

					<div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
						<button
							type="button"
							onClick={onCancel}
							style={{
								padding: '0.75rem 1.5rem',
								backgroundColor: '#6c757d',
								color: 'white',
								border: 'none',
								borderRadius: '4px',
								cursor: 'pointer'
							}}
						>
							Отмена
						</button>
						<button
							type="submit"
							style={{
								padding: '0.75rem 1.5rem',
								backgroundColor: '#007bff',
								color: 'white',
								border: 'none',
								borderRadius: '4px',
								cursor: 'pointer'
							}}
						>
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default KanbanBoard;