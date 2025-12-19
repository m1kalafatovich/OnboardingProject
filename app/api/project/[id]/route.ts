// /app/api/project/:id/route.ts

'use server'

import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongoose";
import { Project } from "@/models/Project";

/**
 * Get a single project by ID
 * @param request request object
 * @returns response with the project data
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
    } else {
        await connectToDatabase();
        const project = await Project.findById(id).lean();
        if (!project) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        } else {
            return NextResponse.json(project, { status: 200 });
        }
    }
}

/**
 * Update a project by ID
 * @param request request object
 * @return response with the updated project data
 */
export async function PUT(request: Request) {
    const validator = z.object({
        id: z.string().min(1),
        update: z.object({
            projectName: z.string().min(1),
            startDate: z.coerce.date(),
            endDate: z.coerce.date().optional(),
            description: z.string().optional(),
            deploymentLink: z.string().url().optional(),
            githubLink: z.string().url().optional(),
        }),
    });
    const parsedRequest = validator.parse(await request.json());
    const id = parsedRequest.id;
    const updatedData = parsedRequest.update;

    await connectToDatabase();
    const updatedProject = await Project.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true },
    ).lean();

    if (!updatedProject) {
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
    } else {
        return NextResponse.json(updatedProject, { status: 200 });
    }
}

/**
 * Delete an object by ID
 * @param request request object
 * @return response after deleting the project
 */
export async function DELETE(request: Request) {
    const validator = z.object({ id: z.string().min(1) });
    const { id } = validator.parse(await request.json());
    const deleted = await Project.findByIdAndDelete(id).exec();
    if (!deleted) {
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
    } else {
        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    }    
}