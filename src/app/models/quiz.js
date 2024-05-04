import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const Quiz = mongoose.Schema(
  {
    quizName: {
      type: String,
      required: false,
    },
    difficulty: {
      type: String,
      required: false,
    },

    questions: [
      {
        question: {
          type: String,
          required: false,
        },
        answers: [String],
        correctAnswer: {
          type: Number,
          required: false,
        },
        time: {
          type: Number,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Quiz || mongoose.model("Quiz", Quiz);
