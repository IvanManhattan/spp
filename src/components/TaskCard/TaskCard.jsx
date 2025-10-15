// components/TaskCard/TaskCard.jsx
import React, { useState } from 'react';

const TaskCard = ({ task, onEdit, onDelete, draggable = true }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleDragStart = (e) => {
		if (draggable) {
			e.dataTransfer.setData('taskId', task.id);
		}
	};

	const getPriorityColor = (priority) => {
		switch (priority) {
			case 'high': return '#dc3545';
			case 'medium': return '#ffc107';
			case 'low': return '#28a745';
			default: return '#6c757d';
		}
	};

	const getPriorityText = (priority) => {
		switch (priority) {
			case 'high': return 'Высокий';
			case 'medium': return 'Средний';
			case 'low': return 'Низкий';
			default: return 'Не указан';
		}
	};

	// Проверяем, есть ли описание
	const hasDescription = task.description && task.description.trim() !== '';

	return (
		<div
			draggable={draggable}
			onDragStart={handleDragStart}
			style={{
				backgroundColor: 'white',
				border: `1px solid #e9ecef`,
				borderRadius: '8px',
				padding: '1rem',
				cursor: draggable ? 'grab' : 'default',
				boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
				marginBottom: '0.75rem'
			}}
		>
			{/* Заголовок и приоритет */}
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
				marginBottom: '0.5rem'
			}}>
				<h4 style={{
					margin: 0,
					fontSize: '1rem',
					color: '#333',
					lineHeight: '1.4',
					flex: 1,
					marginRight: '1rem'
				}}>
					{task.content}
				</h4>

				<span style={{
					padding: '0.25rem 0.5rem',
					backgroundColor: getPriorityColor(task.priority) + '20',
					color: getPriorityColor(task.priority),
					borderRadius: '12px',
					fontSize: '0.75rem',
					fontWeight: 'bold'
				}}>
					{getPriorityText(task.priority)}
				</span>
			</div>

			{/* ОПИСАНИЕ */}
			{hasDescription && (
				<div style={{
					marginBottom: '0.75rem',
					padding: '0.75rem',
					backgroundColor: '#f8f9fa',
					borderRadius: '6px',
					borderLeft: '4px solid #007bff'
				}}>
					<p style={{
						margin: 0,
						fontSize: '0.9rem',
						color: '#555',
						lineHeight: '1.5'
					}}>
						{task.description}
					</p>
				</div>
			)}

			{/* Информация о задаче */}
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				fontSize: '0.8rem',
				color: '#6c757d',
				marginBottom: '0.5rem'
			}}>
				<div>
					{task.assignee ? (
						<span>Исполнитель: {task.assignee}</span>
					) : (
						<span style={{ fontStyle: 'italic' }}>Не назначен</span>
					)}
				</div>
			</div>

			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				fontSize: '0.8rem',
				color: '#6c757d',
				marginBottom: '0.5rem'
			}}>
				<span>Создана: {task.createdAt.toLocaleDateString('ru-RU')}</span>
				{task.dueDate && (
					<span>Срок: {task.dueDate.toLocaleDateString('ru-RU')}</span>
				)}
			</div>

			{/* КНОПКИ ДЕЙСТВИЙ */}
			<div style={{
				display: 'flex',
				gap: '0.5rem',
				marginTop: '0.75rem',
				justifyContent: 'flex-end',
				borderTop: '1px solid #e9ecef',
				paddingTop: '0.75rem'
			}}>
				{onEdit && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							onEdit(task);
						}}
						style={{
							padding: '0.4rem 0.8rem',
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '0.8rem'
						}}
					>
						Редактировать
					</button>
				)}

				{onDelete && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							if (window.confirm('Удалить задачу?')) {
								onDelete(task.id);
							}
						}}
						style={{
							padding: '0.4rem 0.8rem',
							backgroundColor: '#dc3545',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '0.8rem'
						}}
					>
						Удалить
					</button>
				)}
			</div>
		</div>
	);
};

export default TaskCard;