# 🎰 Casino Game Microservices – QA Automation Project

This repository contains a QA Automation test suite for a slot machine game system based on microservices architecture.  
The assignment was completed without access to a working backend or frontend, and all test logic was designed according to the provided API specification only.

---

## 📦 Tech Stack

- ✅ Playwright Test Runner
- ✅ TypeScript
- ✅ Axios for HTTP requests
- ✅ Node.js

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run all tests (will fail unless API is active)
npm test

⚠️ Important Notes
🛠 No backend or client application was provided.
All API test cases were created based on the documentation and assumptions outlined in the assignment.
Requests are made to http://localhost:3000, but the server is not expected to be running.
As such, test executions are designed as templates and may fail due to connection errors.

---

🔍 Bonus: Code Review & Debugging (Part 3)
This project also includes a code review and a refactored version of the Selenium login test (as required in Part 3 of the assignment).

📁 Folder: selenium-review/

code-review.md – Analysis of bad practices and proposed improvements.

testLogin.refactored.js – Improved version using best practices.

✅ Key Improvements:
Added proper waits (using until.elementLocated)

Better structure: Arrange–Act–Assert pattern

Enhanced error handling and logging

Removed hardcoded values and repetition

Improved readability and maintainability