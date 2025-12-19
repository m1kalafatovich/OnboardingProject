// /app/api/project/route.ts

'use server'

import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongoose";
import { Project } from "@/models/Project";


/**
 * Fetch all projects
 * @param request request object
 * @return response with all projects
 */
export async function GET(request: Request) {
    await connectToDatabase();
    const products = await Project.find().lean();
    return NextResponse.json(products, { status: 200 });
}

/**
 * Post a new project
 * @param request request object
 * @return response after creating new project
 */
export async function POST(request: Request) {
    const newProject = z.object({
        projectName: z.string().min(1),
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        description: z.string().optional(),
        deploymentLink: z.string().url().optional(),
        githubLink: z.string().url().optional(),
    }).parse(await request.json());
    const createdProject = await Project.create(newProject);
    return NextResponse.json(createdProject, { status: 201 });
}