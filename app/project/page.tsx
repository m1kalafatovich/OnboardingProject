'use client'

import { useState, useEffect } from "react";

async function fetchProjects() {
    try {
        const res = await fetch('/api/project');
        if (!res.ok) {
            throw new Error('Failed to fetch projects');
        }
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

const ProjectPage = () => {
    const [projects, setProjects] = useState<any[]>([]);
    useEffect(() => {
        fetchProjects().then(data => setProjects(data));
    }, []);
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold text-center mb-12">Project Page</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow bg-white">
                        <h2 className="text-2xl font-semibold mb-3">{project.projectName}</h2>
                        <p className="text-gray-700 mb-4">{project.description}</p>
                        <p className="text-sm text-gray-500 mb-4">
                            {new Date(project.startDate).toLocaleDateString()} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Present'}
                        </p>
                        <div className="flex gap-4">
                            <a href={project.deploymentLink} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-600 hover:text-blue-800 underline">
                                Live Demo
                            </a>
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                               className="text-blue-600 hover:text-blue-800 underline">
                                GitHub Repo
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectPage;