"use client";
import Image from "next/image";
import { Card, Navbar } from "flowbite-react";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome to the Quiz App</h1>
      </div>
      <div className="flex">
        <div>
          <Link href="/createQuiz">
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create Quiz
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Create a new quiz by adding multiple choice questions.
              </p>
            </Card>
          </Link>
        </div>
        <div>
          <Link href="/viewQuizzes">
            <Card href="#" className="max-w-sm min-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Take a Quiz
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Take a quiz from our collection of quizzes and test your
                knowledge.
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
