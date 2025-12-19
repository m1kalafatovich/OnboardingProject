// /app/api/experience/:id/route.ts

'use server'

import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongoose";
import { Experience } from "@/models/Experience";

/**
 * Get one experience entry by ID
 * @param request request object
 * @return response with the experience data
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    } else {
        await connectToDatabase();
        const experience = await Experience.findById(id).lean();
        if (!experience) {
            return NextResponse.json({ message: "Experience not found" }, { status: 404 });
        } else {
            return NextResponse.json(experience, { status: 200 });
        }
    }
}

/**
 * Update an experience entry by ID
 * @param request request object containing the updated experience data
 * @return response with the updated experience data
 */
export async function PUT(request: Request) {
    const validator = z.object({
        id: z.string().min(1),
        update: z.object({
            title: z.string().min(1).optional(),
            company: z.string().min(1).optional(),
            startDate: z.coerce.date().optional(),
            endDate: z.coerce.date().optional(),
            description: z.string().optional(),
        }),
    });
    const parsedRequest = validator.parse(await request.json());
    const id = parsedRequest.id;
    const updatedData = parsedRequest.update;

    await connectToDatabase();
    const updatedExperience = await Experience.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true },
    ).lean();

    if (!updatedExperience) {
        return NextResponse.json({ message: "Experience not found" }, { status: 404 });
    } else {
        return NextResponse.json(updatedExperience, { status: 200 });
    }
}

/**
 * Delete an experience entry by ID
 * @param request request object
 * @return response after deleting the experience entry
 */
export async function DELETE(request: Request) {
    const validator = z.object({ id: z.string().min(1) });
    const { id } = validator.parse(await request.json());
    const deleted = await Experience.findByIdAndDelete(id).exec();
    if (!deleted) {
        return NextResponse.json({ message: "Experience not found" }, { status: 404 });
    } else {
        return NextResponse.json({ message: "Experience deleted successfully" }, { status: 200 });
    }
}