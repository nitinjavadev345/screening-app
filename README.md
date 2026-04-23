# 🏛️ Eligibility Screening & Intake System (Cúram-inspired)

A full-stack, production-style eligibility screening system that simulates real-world government benefit platforms (similar to IBM Cúram), enabling citizens to assess eligibility across multiple programs through a dynamic, rule-driven workflow.

---

## 🚀 Overview

This project implements an end-to-end **Screening → Eligibility → Intake flow** with:

* Dynamic multi-step UI (React)
* Rule-based eligibility engine (Spring Boot)
* Idempotent backend APIs
* H2 in-memory database for rapid prototyping
* Cúram-style guided user experience

---

## 🧩 Key Features

### 🧭 Multi-Step Intelligent Screening (IEG-style)

* Guided wizard with conditional navigation
* Skips irrelevant pages dynamically
* Real-time data capture using React Context

### 👨‍👩‍👧 Household Modeling

* Supports multiple household members
* Captures demographics (age, income)
* Automatically adjusts UI based on household size

### ⚙️ Rule-Based Eligibility Engine

Evaluates eligibility for:

* 🍽️ Food Assistance
* 🏥 Healthcare Support
* 👴 Pension Benefits

Includes:

* Household-level and individual-level rules
* Reason-based eligibility explanations (not just boolean results)

---

### 🧠 Idempotent Backend Design

* Prevents duplicate person creation
* Handles concurrent requests safely
* Uses DB constraints + retry logic

---

### 📊 Cúram-Inspired UX

* Section-based layout
* Progress indicator across steps
* Structured review screen
* Eligibility results with explanations

---

## 🏗️ Architecture

```
React UI (Wizard)
   ↓
Spring Boot REST APIs
   ↓
Service Layer (Eligibility Rules Engine)
   ↓
JPA / Hibernate
   ↓
H2 Database
```

---

## 🛠️ Tech Stack

### Frontend

* React (Hooks, Context API)
* Multi-step wizard pattern
* Dynamic form handling

### Backend

* Spring Boot 3
* Spring Data JPA
* RESTful APIs

### Database

* H2 (In-memory)
* JPA Entities

---

## 📂 Project Structure

```
screening-app/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   └── application.properties
│
├── frontend/
│   ├── components/
│   ├── context/
│   ├── steps/
│   └── App.js
```

---

## 🔄 Application Flow

1. **Household Info**

   * User enters number of household members

2. **Members Details**

   * Name, Age for each member

3. **Income Details**

   * Monthly income per member

4. **Review Screen**

   * Full summary before submission

5. **Eligibility Results**

   * Program-wise eligibility
   * Detailed reasoning

---

## 🧪 Sample Eligibility Logic

| Program    | Rule                  |
| ---------- | --------------------- |
| Food       | Total income ≤ 40,000 |
| Healthcare | Avg income ≤ 15,000   |
| Pension    | Any member age ≥ 60   |

---

## 🔐 API Endpoints

### Screening

```
POST /screening
```

### Apply for Eligibility

```
POST /screening/{screeningId}/apply
```

---

## 💾 Database

### Tables:

* `screening_data` → stores JSON input
* `person` → identity resolution

### Access H2 Console:

```
http://localhost:8080/h2-console
```

---

## ⚡ Getting Started

### Backend

```bash
cd backend
mvn spring-boot:run
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🌐 URLs

* Frontend → http://localhost:3000
* Backend → http://localhost:8080
* H2 Console → http://localhost:8080/h2-console

---

## 🧠 Design Decisions

* Used JSON storage for flexible screening schema
* Ensured consistent field naming across UI → API → DB
* Implemented idempotent identity resolution
* Designed rule engine to be extensible for future programs

---

## 🚧 Future Enhancements

* Add Intake workflow with document verification
* Integrate rules engine like Drools
* Add authentication (OAuth/JWT)
* Deploy to cloud (AWS/GCP)
* Replace H2 with PostgreSQL

---

## 📸 Screenshots

### Household Information
![Household](frontend/public/screenshots/household.png)

### Members Details
![Members](frontend/public/screenshots/members.png)

### Income Details
![Income](frontend/public/screenshots/income.png)

### Review Screen
![Review](frontend/public/screenshots/review.png)

### Eligibility Results
![Results](frontend/public/screenshots/results.png)

---

## 💡 What This Demonstrates

* Full-stack system design thinking
* Real-world domain modeling (public benefits)
* Clean API + UI contract design
* Production-grade backend practices

---

## 👨‍💻 Author

**Nitin Patil**

---

## ⭐ If you found this useful

Give it a star on GitHub!
Thank you.
