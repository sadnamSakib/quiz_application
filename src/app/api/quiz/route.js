import connectDB from "@/app/lib/dbConnect";
import Quiz from "../../models/quiz";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const quizData = await request.json();

  const newQuiz = new Quiz(quizData);

  const savedQuiz = await newQuiz.save();

  return NextResponse.json({ success: true });
}

export async function GET(request) {
  await connectDB();
  const quizes = await Quiz.find({});

  return NextResponse.json(quizes);
}
