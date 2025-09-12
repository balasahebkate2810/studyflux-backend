const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

// Load your Firebase Admin credentials
const serviceAccount = require("./serviceAccount.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-project-id.appspot.com", // Replace with your actual Firebase Storage bucket
});

// Initialize Firestore and Storage
const db = admin.firestore();
const bucket = admin.storage().bucket();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test route to check if server is running
app.get("/", (req, res) => {
  res.send("AI StudyFlux Backend Running");
});

// API to handle question answering
app.post("/ask", (req, res) => {
  const { question } = req.body;
  const answer = question 
    ? `You asked: "${question}". Answer coming soon.` 
    : "Please ask a question.";
  res.json({ answer });
});

// API to generate quiz
app.post("/generate-quiz", (req, res) => {
  const sampleQuiz = {
    questions: [
      {
        id: 1,
        question: "What is AI?",
        options: ["Artificial Intelligence", "Automated Input", "Apple Inc."],
        answer: "Artificial Intelligence",
      },
      {
        id: 2,
        question: "Where do you store your notes?",
        options: ["Local computer", "Firebase Storage", "USB Drive"],
        answer: "Firebase Storage",
      }
    ]
  };
  res.json(sampleQuiz);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`AI StudyFlux Backend listening at http://localhost:${PORT}`);
});
