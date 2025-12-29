// /app/api/project/route.ts

'use server'

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Project } from "@/models/Project";


/**
 * Fetch all projects
 * @param request request object
 * @return response with all projects
 */
export async function GET() {
    try {
        await connectToDatabase();
        const projects = await Project.find();
        return NextResponse.json(projects, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}

/**
 * Post a new project
 * @param request request object
 * @return response after creating new project
 */
export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const newProjectBody = await request.json();
        const createdProject = await Project.create(newProjectBody);
        return NextResponse.json(createdProject, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}