import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">Mateo Kalafatovich</div>
                <div className="space-x-4">
                    <a href="/" className="text-gray-300 hover:text-white">Home</a>
                    <a href="/experience" className="text-gray-300 hover:text-white">Experience</a>
                    <a href="/project" className="text-gray-300 hover:text-white">Projects</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar