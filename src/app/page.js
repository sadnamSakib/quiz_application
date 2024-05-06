"use client";
import Image from "next/image";
import { Card, Navbar } from "flowbite-react";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-center">Welcome to Quiz App</h1>
        <p className="text-lg">Take quizzes and improve your knowledge</p>
      </div>
      <Card className="m-6 p-6">
        <div className="mb-6">
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">User Stats</h2>
            <p className="text-2xl ">Total quizzes taken: 2</p>
            <p className="text-2xl ">Average score : 75%</p>
            <p className="text-2xl ">Rank : 8</p>
          </div>
        </div>
      </Card>
    </main>
  );
}
