'use client'

import { useState, useEffect } from "react";

async function fetchExperiences() {
    try {
        const res = await fetch('/api/experience');
        if (!res.ok) {
            throw new Error('Failed to fetch experiences');
        }
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

const experiencePage = () => {
    const [experiences, setExperiences] = useState<any[]>([]);

    useEffect(() => {
        fetchExperiences().then(data => setExperiences(data));
    }, []);
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold text-center mb-12">Experience Page</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((exp) => (
                    <div key={exp._id} className="border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow bg-white">
                        <h2 className="text-2xl font-semibold mb-3">{exp.title} at {exp.company}</h2>
                        <p className="text-gray-700 mb-4">{exp.description}</p>
                        <p className="text-sm text-gray-500 mb-2">
                            {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                        </p>
                        <p className="text-sm text-gray-600">{exp.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default experiencePage;