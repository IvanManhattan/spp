// pages/ProjectsPage.jsx
import React from 'react';
import ProjectList from '../components/ui/ProjectList';

const mockProjects = [
	{
		id: '1',
		title: 'Тестовый проект',
		description: 'Проект для тестирования отображения описания',
		status: 'active',
		createdAt: new Date('2024-01-15'),
		tasks: [
			{
				id: 'test-1',
				content: 'Тестовая задача с описанием',
				description: 'Это тестовое описание которое ДОЛЖНО отображаться в карточке!',
				status: 'todo',
				priority: 'high',
				assignee: 'Тестовый исполнитель',
				createdAt: new Date('2024-01-16'),
				dueDate: new Date('2024-02-01')
			},
			{
				id: 'test-2',
				content: 'Вторая тестовая задача',
				description: 'Еще одно описание для проверки отображения',
				status: 'inProgress',
				priority: 'medium',
				assignee: 'Другой исполнитель',
				createdAt: new Date('2024-01-17'),
				dueDate: new Date('2024-01-25')
			},
			{
				id: 'test-3',
				content: 'Задача без описания',
				description: '', // Пустое описание
				status: 'done',
				priority: 'low',
				assignee: '',
				createdAt: new Date('2024-01-18')
			}
		]
	}
];

const ProjectsPage = ({ onProjectSelect }) => {
	return (
		<div style={{ maxWidth: '800px', margin: '0 auto' }}>
			<ProjectList
				projects={mockProjects}
				onProjectSelect={onProjectSelect}
			/>
		</div>
	);
};

export default ProjectsPage;