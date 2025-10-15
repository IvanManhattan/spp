import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects, onProjectSelect }) => {
	const [filter, setFilter] = useState('all'); // all, active, completed

	const filteredProjects = projects.filter(project => {
		if (filter === 'all') return true;
		if (filter === 'active') return project.status === 'active';
		if (filter === 'completed') return project.status === 'completed';
		return true;
	});

	const handleProjectClick = (project) => {
		if (onProjectSelect) {
			onProjectSelect(project);
		}
	};

	return (
		<div className="project-list">
			{/* Фильтры */}
			<div style={{
				marginBottom: '1.5rem',
				display: 'flex',
				gap: '1rem',
				alignItems: 'center'
			}}>
				<h2 style={{ margin: 0, marginRight: 'auto' }}>Мои проекты</h2>

				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<button
						onClick={() => setFilter('all')}
						style={{
							padding: '0.5rem 1rem',
							border: '1px solid #007bff',
							backgroundColor: filter === 'all' ? '#007bff' : 'white',
							color: filter === 'all' ? 'white' : '#007bff',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '0.9rem'
						}}
					>
						Все ({projects.length})
					</button>
					<button
						onClick={() => setFilter('active')}
						style={{
							padding: '0.5rem 1rem',
							border: '1px solid #28a745',
							backgroundColor: filter === 'active' ? '#28a745' : 'white',
							color: filter === 'active' ? 'white' : '#28a745',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '0.9rem'
						}}
					>
						Активные ({projects.filter(p => p.status === 'active').length})
					</button>
					<button
						onClick={() => setFilter('completed')}
						style={{
							padding: '0.5rem 1rem',
							border: '1px solid #6c757d',
							backgroundColor: filter === 'completed' ? '#6c757d' : 'white',
							color: filter === 'completed' ? 'white' : '#6c757d',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '0.9rem'
						}}
					>
						Завершенные ({projects.filter(p => p.status === 'completed').length})
					</button>
				</div>
			</div>

			{/* Список проектов */}
			<div>
				{filteredProjects.length === 0 ? (
					<div style={{
						textAlign: 'center',
						padding: '2rem',
						color: '#666'
					}}>
						{filter === 'all'
							? 'Проектов пока нет'
							: `Нет проектов со статусом "${filter}"`}
					</div>
				) : (
					<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						{filteredProjects.map(project => (
							<ProjectCard
								key={project.id}
								project={project}
								onProjectClick={onProjectSelect ? handleProjectClick : undefined}
							/>
						))}
					</div>
				)}
			</div>

			{/* Статистика */}
			<div style={{
				marginTop: '1.5rem',
				padding: '1rem',
				backgroundColor: '#f8f9fa',
				borderRadius: '4px',
				fontSize: '0.9rem'
			}}>
				<strong>Статистика:</strong> {filteredProjects.length} из {projects.length} проектов
			</div>
		</div>
	);
};

export default ProjectList;