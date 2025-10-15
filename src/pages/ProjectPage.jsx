// pages/ProjectPage.jsx
import React, { useState } from 'react';
import KanbanBoard from '../components/KanbanBoard/KanbanBoard';

const ProjectPage = ({ project, onBack }) => {
	const [currentProject, setCurrentProject] = useState(project);

	const handleTaskUpdate = (updatedTasks) => {
		setCurrentProject(prev => ({
			...prev,
			tasks: updatedTasks
		}));
	};

	return (
		<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
			{/* Кнопка назад */}
			<button
				onClick={onBack}
				style={{
					marginBottom: '1.5rem',
					padding: '0.5rem 1rem',
					backgroundColor: '#6c757d',
					color: 'white',
					border: 'none',
					borderRadius: '4px',
					cursor: 'pointer',
					fontSize: '0.9rem',
					display: 'flex',
					alignItems: 'center',
					gap: '0.5rem',
					transition: 'all 0.2s ease'
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.backgroundColor = '#5a6268';
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.backgroundColor = '#6c757d';
				}}
			>
				← Назад к проектам
			</button>

			{/* Kanban доска */}
			<KanbanBoard
				project={currentProject}
				onTaskUpdate={handleTaskUpdate}
			/>
		</div>
	);
};

export default ProjectPage;