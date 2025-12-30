// /app/api/project/:id/route.ts

'use server'

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Project } from "@/models/Project";
import mongoose from "mongoose";

type Params = { id: string };

/**
 * Get a single project by ID
 * @param request request object
 * @returns response with the project data
 */
export async function GET(request: Request, context: { params: Params }) {
    try {
        const params = await context.params;
        const { id } = params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid Project ID" }, { status: 400 });
        }
        await connectToDatabase();
        const project = await Project.findById(id);
        if (!project) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }
        return NextResponse.json(project, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

/**
 * Update a project by ID
 * @param request request object
 * @return response with the updated project data
 */
export async function PUT(request: Request, context: { params: Params }) {
    try {
        const params = await context.params;
        const { id } = params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid Project ID" }, { status: 400 });
        }

        await connectToDatabase();
        const project = await Project.findById(id);
        if (!project) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }

        const body = await request.json();
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            body,
            { new: true }
        ).lean();

        if (!updatedProject) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }
        return NextResponse.json(updatedProject, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}

/**
 * Delete an object by ID
 * @param request request object
 * @return response after deleting the project
 */
export async function DELETE(request: Request, context: { params: Params }) {
    try {
        const params = await context.params;
        const { id } = params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid Project ID" }, { status: 400 });
        }

        await connectToDatabase();
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }  
}