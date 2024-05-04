import connectDB from "@/app/lib/dbConnect";
import Quiz from "../../../models/quiz";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  await connectDB();
  const { id } = context.params;
  const quiz = await Quiz.findById(id);
  console.log(quiz);
  return NextResponse.json(quiz);
}
