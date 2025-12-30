// /app/api/experience/[id]/route.ts

'use server'

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Experience } from "@/models/Experience";
import mongoose from "mongoose";

type Params = { id: string };

/**
 * Get one experience entry by ID
 */
export async function GET(request: Request,  context : { params:  Params }) {
    try {
        const params = await context.params;
        const { id } = params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }
        await connectToDatabase();
        const experience = await Experience.findById(id);
        if (!experience) {
            return NextResponse.json({ message: "Experience not found" }, { status: 404 });
        }
        return NextResponse.json(experience, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

/**
 * Update an experience entry by ID
 */
export async function PUT(request: Request,  context : { params:  Params }) {
    try {
        const params = await context.params;
        const { id } = params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }

        await connectToDatabase();
        const experience = await Experience.findById(id);
        if (!experience) {
            return NextResponse.json({ message: "Experience not found" }, { status: 404 });
        }

        const body = await request.json();

        const updatedExperience = await Experience.findByIdAndUpdate(
            id, 
            body,
            { new: true }
        ).lean();

        if (!updatedExperience) {
            return NextResponse.json({ message: "Experience not found" }, { status: 404 });
        }
        return NextResponse.json(updatedExperience, { status: 200 });
    } catch (err) {
        console.error(err);
        if (err && typeof err === 'object' && 'errors' in err) {
            // @ts-ignore
            return NextResponse.json({ message: "Invalid request", errors: err.errors }, { status: 400 });
        }
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

/**
 * Delete an experience entry by ID
 */
export async function DELETE(request: Request, context: { params: Params }) {
    try {
        const params = await context.params;
        const { id } = params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }
        await connectToDatabase();
        const deleted = await Experience.findByIdAndDelete(id).exec();
        if (!deleted) {
            return NextResponse.json({ message: "Experience not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Experience deleted successfully" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}