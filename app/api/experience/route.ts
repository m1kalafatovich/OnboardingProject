// app/api/experience/route.ts

'use server'

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { z } from "zod";
import { Experience } from "@/models/Experience";

/**
 * Fetch all experience entries
 * @param request request object
 * @return response with experience data
 */
export async function GET(request: Request) {
    await connectToDatabase();
    const experiences = await Experience.find().lean();
    return NextResponse.json(experiences, { status: 200 });
}

/**
 * Create a new experience entry
 * @param request request object
 * @return response after creating new experience entry
 */
export async function POST(request: Request) {
    const newExperience = z.object({
        title: z.string().min(1),
        company: z.string().min(1),
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        description: z.string().optional(),
    }).parse(await request.json());
    const createdExperience = await Experience.create(newExperience);
    return NextResponse.json(createdExperience, { status: 201 });
}