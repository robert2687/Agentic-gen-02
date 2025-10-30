import { GoogleGenAI } from "@google/genai";
import type { Agent } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using mocked responses.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const MASTER_PROMPT_TEMPLATE = `
You are a specialized AI agent in a team building a complete, production-ready application.
Your designated role is:
**{AGENT_ROLE}**

You must work sequentially. You will receive input from the previous agent in the workflow. Your output will become the input for the next agent.
Do not skip steps. Always validate and refine your work. Ensure your output is modular, reusable, secure, and well-documented.

The previous agent provided the following context/input for you:
---
{AGENT_INPUT}
---

YOUR TASK:
Carefully analyze the input and perform your role. Generate the specified output.
Strictly adhere to the output format specified in your role.
Begin your response immediately without any introductory phrases like "Certainly!" or "Here is the output".
`;

const mockResponses: Record<string, string> = {
  Planner: `
# Project Plan: Social Fitness Tracker

## 1. Project Overview
A web application that tracks daily workouts, allows users to add friends, and share their progress on a social feed. The app should be responsive, secure, and user-friendly.

## 2. Core Features
- User authentication (Sign up, Login, Logout)
- Workout logging (Create, Read, Update, Delete workouts)
- Social feed to view friends' workout activities
- Friends system (Add/Remove friends)
- User profiles

## 3. Tech Stack
- **Frontend:** HTML, CSS, JavaScript (self-contained file)
- **Backend:** None (client-side logic only for this MVP)
- **Deployment:** Static Web Host (e.g., Netlify, Vercel)
`,
  Architect: `
# Architecture Blueprint: Social Fitness Tracker

## 1. Component Diagram
\`\`\`text
+-----------------------+
|   [UI Components]     |
|  - AuthForm           |
|  - WorkoutForm        |
|  - Feed               |
|  - ProfileView        |
+-----------------------+
        |
        v
+-----------------------+
|  [State Management]   |
|  - currentUser        |
|  - workouts           |
|  - friends            |
|  - feedItems          |
+-----------------------+
        |
        v
+-----------------------+
| [Local Storage API]   |
| - saveUserData()      |
| - loadUserData()      |
+-----------------------+
\`\`\`

## 2. Data Schema (Client-Side)
\`\`\`yaml
# Using localStorage, keys prefixed with 'fitnessApp_'
users:
  - id: string (UUID)
    email: string
    name: string
    friends: string[] # Array of user IDs

workouts:
  - id: string (UUID)
    userId: string
    type: string # e.g., 'Running', 'Weightlifting'
    duration: number # in minutes
    date: string # ISO 8601
\`\`\`

## 3. API Contracts
Since this is a client-side only application, all "API" contracts are functions interacting with localStorage.
- \`login(email, password)\`: Returns user object or null.
- \`signup(email, password, name)\`: Creates and returns a new user.
- \`getWorkouts(userId)\`: Returns a list of workout objects.
- \`addWorkout(workoutData)\`: Adds a new workout.
`,
  'Visual Designer': `
# UI Specification: Social Fitness Tracker

## 1. Design Tokens
\`\`\`json
{
  "colors": {
    "primary": "#3B82F6",
    "secondary": "#10B981",
    "background": "#F3F4F6",
    "surface": "#FFFFFF",
    "textPrimary": "#1F2937",
    "textSecondary": "#6B7280"
  },
  "typography": {
    "fontFamily": "'Inter', sans-serif",
    "header": "2.25rem",
    "subHeader": "1.5rem",
    "body": "1rem"
  },
  "spacing": {
    "small": "8px",
    "medium": "16px",
    "large": "32px"
  }
}
\`\`\`

## 2. Component Mappings
- **Buttons:** Use a standard button component with primary (blue) and secondary (green) variants.
- **Forms:** Inputs should be clean with clear labels and validation feedback.
- **Cards:** Workout entries and feed items will be displayed in cards with rounded corners and box shadows.
- **Layout:** A main content area with a fixed navigation header. The layout should be responsive for mobile and desktop.
`,
  Coder: `
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0f2f5; color: #333; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .container { background-color: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        h1 { color: #1a73e8; margin-top: 0; }
        input[type="text"] { width: calc(100% - 22px); padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 1rem; }
        button { background-color: #1a73e8; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
        button:hover { background-color: #1669c1; }
        ul { list-style-type: none; padding: 0; }
        li { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; }
        li.completed span { text-decoration: line-through; color: #888; }
        .delete-btn { background-color: #ea4335; font-size: 12px; padding: 5px 8px; }
        .delete-btn:hover { background-color: #d93025; }
    </style>
</head>
<body>
    <div class="container">
        <h1>My Todo List</h1>
        <input type="text" id="todoInput" placeholder="Add a new task...">
        <button onclick="addTodo()">Add</button>
        <ul id="todoList"></ul>
    </div>
    <script>
        function addTodo() {
            const input = document.getElementById('todoInput');
            const task = input.value.trim();
            if (task === '') return;
            
            const li = document.createElement('li');
            
            const span = document.createElement('span');
            span.textContent = task;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            
            li.appendChild(span);
li.appendChild(deleteBtn);
            
            document.getElementById('todoList').appendChild(li);
            input.value = '';
        }
    </script>
</body>
</html>
\`\`\`
`,
  Reviewer: `
# Code Review Findings

## 1. High Severity: No Way to Delete or Complete Todos
- **Observation:** The generated JavaScript creates a delete button, but there is no event listener attached to it, making it non-functional. There is also no way to mark a todo as completed.
- **Recommendation:** Add an event listener to the delete button to remove its parent \`li\` element. Add another event listener to the \`span\` to toggle a 'completed' class on the \`li\`.

## 2. Medium Severity: Inefficient DOM Manipulation
- **Observation:** The \`addTodo\` function creates multiple elements and appends them individually.
- **Recommendation:** Use a document fragment or set the \`innerHTML\` of the list item for slightly better performance on large-scale additions, though current implementation is acceptable for a small app.

## 3. Low Severity: Accessibility Issue
- **Observation:** The delete button has no aria-label, which is not ideal for screen readers.
- **Recommendation:** Add an \`aria-label\` to the delete button, such as "Delete task: [task name]".
`,
  Patcher: `
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0f2f5; color: #333; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .container { background-color: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        h1 { color: #1a73e8; margin-top: 0; }
        input[type="text"] { width: calc(100% - 22px); padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 1rem; }
        button { background-color: #1a73e8; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
        button:hover { background-color: #1669c1; }
        ul { list-style-type: none; padding: 0; }
        li { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; cursor: pointer; }
        li.completed span { text-decoration: line-through; color: #888; }
        .delete-btn { background-color: #ea4335; font-size: 12px; padding: 5px 8px; }
        .delete-btn:hover { background-color: #d93025; }
    </style>
</head>
<body>
    <div class="container">
        <h1>My Todo List</h1>
        <input type="text" id="todoInput" placeholder="Add a new task...">
        <button onclick="addTodo()">Add</button>
        <ul id="todoList"></ul>
    </div>
    <script>
        function addTodo() {
            const input = document.getElementById('todoInput');
            const task = input.value.trim();
            if (task === '') return;
            
            const li = document.createElement('li');
            li.onclick = () => li.classList.toggle('completed');
            
            const span = document.createElement('span');
            span.textContent = task;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = (e) => {
                e.stopPropagation(); // Prevent li click event
                li.remove();
            };
            
            li.appendChild(span);
            li.appendChild(deleteBtn);
            
            document.getElementById('todoList').appendChild(li);
            input.value = '';
        }
    </script>
</body>
</html>
\`\`\`

# Changelog
- **FIX:** Implemented delete functionality for todo items.
- **FEAT:** Added ability to mark todos as complete by clicking on them.
- **REFACTOR:** Attached event listeners directly during element creation.
`,
  Deployer: `
# Deployment Guide: Static Todo App

This guide explains how to deploy the self-contained \`index.html\` file to Netlify.

## Steps:
1.  **Save the HTML:** Save the provided HTML code into a file named \`index.html\`.
2.  **Sign up for Netlify:** If you don't have an account, sign up at [netlify.com](https://netlify.com). It's free for static sites.
3.  **Deploy via Drag-and-Drop:**
    - Log in to your Netlify account.
    - Go to the "Sites" tab.
    - Drag the \`index.html\` file from your computer and drop it onto the deployment area in the Netlify UI.
4.  **Done!** Netlify will automatically build and deploy your site, providing you with a unique URL (e.g., \`random-name-12345.netlify.app\`).

---

## Deployment Report
- **Status:** Success
- **Method:** Manual Drag-and-Drop
- **Provider:** Netlify
- **Live URL:** [https://example-todo-app.netlify.app](https://example-todo-app.netlify.app) (Example URL)
`,
};


const runMockAgentStream = async (agent: Agent, onChunk: (chunk: string) => void): Promise<string> => {
    const fullOutput = mockResponses[agent.name] || `## Mock Output for ${agent.name}\n- Processing...\n- Done.`;
    const chunks = fullOutput.split('\n');
    for (const chunk of chunks) {
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
        onChunk(chunk + '\n');
    }
    return fullOutput;
};

export const runAgentStream = async (agent: Agent, input: string, onChunk: (chunk: string) => void): Promise<string> => {
  if (!ai) {
    return runMockAgentStream(agent, onChunk);
  }

  const prompt = MASTER_PROMPT_TEMPLATE
    .replace('{AGENT_ROLE}', agent.role)
    .replace('{AGENT_INPUT}', input);

  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    let fullText = "";
    for await (const chunk of stream) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(chunkText);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get a response from the AI. Check your API key and network connection.");
  }
};
