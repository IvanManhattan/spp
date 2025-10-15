// components/TaskForm/TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel, initialStatus = 'todo' }) => {
	const [formData, setFormData] = useState({
		content: '',
		description: '',
		assignee: '',
		status: initialStatus, // Важно: используем initialStatus
		priority: 'medium',
		dueDate: ''
	});

	const [errors, setErrors] = useState({});

	const handleChange = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.content.trim()) {
			newErrors.content = 'Название задачи обязательно';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const task = {
			id: Date.now().toString(),
			content: formData.content.trim(),
			description: formData.description.trim(),
			assignee: formData.assignee.trim(),
			status: formData.status, // Используем выбранный статус из формы
			priority: formData.priority,
			createdAt: new Date(),
			dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
			tags: []
		};

		console.log('Creating task with status:', task.status); // Для отладки
		onSubmit(task);
	};

	return (
		<div style={{
			backgroundColor: 'white',
			borderRadius: '8px',
			padding: '1.5rem',
			boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
			border: '1px solid #e9ecef'
		}}>
			<h3 style={{
				margin: '0 0 1.5rem 0',
				color: '#333',
				fontSize: '1.25rem'
			}}>
				Создать новую задачу
			</h3>

			<form onSubmit={handleSubmit}>
				{/* Название задачи */}
				<div style={{ marginBottom: '1rem' }}>
					<label style={{
						display: 'block',
						marginBottom: '0.5rem',
						fontWeight: '500',
						color: '#495057'
					}}>
						Название задачи *
					</label>
					<input
						type="text"
						value={formData.content}
						onChange={(e) => handleChange('content', e.target.value)}
						placeholder="Введите название задачи..."
						style={{
							width: '100%',
							padding: '0.75rem',
							border: `1px solid ${errors.content ? '#dc3545' : '#ddd'}`,
							borderRadius: '4px',
							fontSize: '1rem'
						}}
					/>
					{errors.content && (
						<span style={{
							color: '#dc3545',
							fontSize: '0.8rem',
							marginTop: '0.25rem',
							display: 'block'
						}}>
							{errors.content}
						</span>
					)}
				</div>

				{/* Описание */}
				<div style={{ marginBottom: '1rem' }}>
					<label style={{
						display: 'block',
						marginBottom: '0.5rem',
						fontWeight: '500',
						color: '#495057'
					}}>
						Описание
					</label>
					<textarea
						value={formData.description}
						onChange={(e) => handleChange('description', e.target.value)}
						placeholder="Опишите детали задачи..."
						style={{
							width: '100%',
							padding: '0.75rem',
							border: '1px solid #ddd',
							borderRadius: '4px',
							fontSize: '1rem',
							minHeight: '80px',
							resize: 'vertical'
						}}
					/>
				</div>

				{/* Исполнитель и статус */}
				<div style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '1rem',
					marginBottom: '1rem'
				}}>
					<div>
						<label style={{
							display: 'block',
							marginBottom: '0.5rem',
							fontWeight: '500',
							color: '#495057'
						}}>
							Исполнитель
						</label>
						<input
							type="text"
							value={formData.assignee}
							onChange={(e) => handleChange('assignee', e.target.value)}
							placeholder="Имя исполнителя"
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '1px solid #ddd',
								borderRadius: '4px',
								fontSize: '1rem'
							}}
						/>
					</div>

					<div>
						<label style={{
							display: 'block',
							marginBottom: '0.5rem',
							fontWeight: '500',
							color: '#495057'
						}}>
							Статус
						</label>
						<select
							value={formData.status}
							onChange={(e) => handleChange('status', e.target.value)}
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '1px solid #ddd',
								borderRadius: '4px',
								fontSize: '1rem',
								backgroundColor: 'white'
							}}
						>
							<option value="todo">To Do</option>
							<option value="inProgress">In Progress</option>
							<option value="done">Done</option>
						</select>
					</div>
				</div>

				{/* Приоритет и срок */}
				<div style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '1rem',
					marginBottom: '1.5rem'
				}}>
					<div>
						<label style={{
							display: 'block',
							marginBottom: '0.5rem',
							fontWeight: '500',
							color: '#495057'
						}}>
							Приоритет
						</label>
						<select
							value={formData.priority}
							onChange={(e) => handleChange('priority', e.target.value)}
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '1px solid #ddd',
								borderRadius: '4px',
								fontSize: '1rem',
								backgroundColor: 'white'
							}}
						>
							<option value="low">Низкий</option>
							<option value="medium">Средний</option>
							<option value="high">Высокий</option>
						</select>
					</div>

					<div>
						<label style={{
							display: 'block',
							marginBottom: '0.5rem',
							fontWeight: '500',
							color: '#495057'
						}}>
							Срок выполнения
						</label>
						<input
							type="date"
							value={formData.dueDate}
							onChange={(e) => handleChange('dueDate', e.target.value)}
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '1px solid #ddd',
								borderRadius: '4px',
								fontSize: '1rem'
							}}
						/>
					</div>
				</div>

				<div style={{
					display: 'flex',
					gap: '1rem',
					justifyContent: 'flex-end'
				}}>
					<button
						type="button"
						onClick={onCancel}
						style={{
							padding: '0.75rem 1.5rem',
							backgroundColor: '#6c757d',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '1rem'
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
							cursor: 'pointer',
							fontSize: '1rem'
						}}
					>
						Создать задачу
					</button>
				</div>
			</form>
		</div>
	);
};

export default TaskForm;