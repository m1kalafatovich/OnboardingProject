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
export async function GET() {
    try {
        await connectToDatabase();
        const experiences = await Experience.find();
        return NextResponse.json(experiences, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

/**
 * Create a new experience entry
 * @param request request object
 * @return response after creating new experience entry
 */
export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const newExperienceBody = await request.json();
        const createdExperience = await Experience.create(newExperienceBody);
        return NextResponse.json(createdExperience, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}