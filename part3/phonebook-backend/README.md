# Phonebook Backend

This is the backend for the Phonebook application built as part of the **Full Stack Open** course (Part 3).
The backend is built using **Node.js**, **Express**, and **Morgan** for logging.
It provides a REST API for managing phonebook entries.

---

## 🔗 Live Backend

The backend is deployed on **Render** and is available at:
https://fsopen-phonebackend-2025.onrender.com
Example endpoint:
https://fsopen-phonebackend-2025.onrender.com/api/persons

---

## 📌 API Endpoints

- **GET /api/persons**  
  Returns all phonebook entries

- **GET /api/persons/:id**  
  Returns a single phonebook entry by id

- **POST /api/persons**  
  Adds a new phonebook entry  
  Requires a JSON body with `name` and `number`

- **DELETE /api/persons/:id**  
  Deletes a phonebook entry by id

---

## 🛠 Running the Backend Locally

1. Install dependencies:
   ```bash
   npm install
