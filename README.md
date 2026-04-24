
## 🏛️ Eligibility Screening & Intake System

A full-stack eligibility screening system inspired by enterprise social program management platforms.

The application simulates real-world government benefit workflows, allowing users to determine eligibility across multiple programs using a dynamic, rule-driven process.

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

- Guided wizard with step progress indicator
- Conditional navigation
- Review before submission
- Real-time data capture using React Context


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
* Transparent reason-based outcomes.


## 🧠 AI Features (NEW)

Integrated with **Ollama + Phi-3** local LLM.

Generates structured summaries such as:

- Approved Programs
- Denied Programs
- Reasons for decisions
- Recommended next steps

### Example Output

- Approved Programs:
  - Food
  - Pension

- Denied Programs:
  - Healthcare

- Reasons:
  - Household income within threshold
  - Senior household member present

- Next Steps:
  - Apply for approved programs
  - Review denial criteria

### Why This Matters

Demonstrates:

- AI integration in enterprise systems
- Prompt engineering
- Privacy-friendly local LLM architecture
- Human-readable decisions

---

### 🧠 Idempotent Backend Design

* Prevents duplicate person creation
* Handles concurrent requests safely
* Uses DB constraints + retry logic

---

### 📊 Public Sectore UX style

* Section-based layout
* Progress indicator across steps
* Structured review screen
* Eligibility results with explanations

---

## 🏗️ Architecture

```

```text
React Frontend (Wizard UI)
        |
        v
Spring Boot REST APIs
        |
        v
Eligibility Rules Engine
        |
   +----+----+
   |         |
   v         v
H2 DB    AI Service
            |
            v
      Ollama + Phi-3

```

---
## 🏗️ Architecture Diagram

+----------------------+
|   User Browser       |
|   React Frontend     |
+----------+-----------+
           |
           | REST Calls
           v
+----------------------+
| Spring Boot Backend  |
| Controllers + APIs   |
+----------+-----------+
           |
           v
+----------------------+
| Screening Service    |
| Rules Engine         |
+-----+-----------+----+
      |           |
      v           v
+---------+   +---------+
|   H2 DB |   | Ollama  |
| Storage |   | Phi-3   |
+---------+   +---------+

## 🔄 API Flow (Sequence Diagram)
User completes wizard
        |
        v
POST /screening
        |
Stores intake JSON
        |
Returns screeningId
        |
        v
POST /screening/{id}/apply
        |
Eligibility rules executed
        |
AI summary generated
        |
Returns results + explanation

### 🔍 Flow Explanation

1. User enters household data through a multi-step React wizard
2. Frontend submits data to `/screening` API
3. Backend stores JSON in H2 database and returns an ID
4. Frontend calls `/application/{id}/apply` to evaluate eligibility
5. Backend processes rules and returns eligibility results
6. AI siummary is generated
6. UI displays program eligibility with reasons and AI summary explanation.-

## 🛠️ Tech Stack

### Frontend

React.js
JavaScript
Context API
Multi-step Wizard Pattern

### Backend

Java 17+
Spring Boot
Spring Web
Spring Data JPA
Hibernate

### Database

* H2 (In-memory)
* JPA Entities

### AI Layer

Ollama
Phi-3

### Tools
   
Git
GitHub
VS Code
Maven
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

   * Program decisions
   * Rule Explanations
   * AI Summary


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
## 🤖 Ollama Setup

1. Install Ollama
   Download from:
   https://ollama.com

2. Pull Phi-3 Model
   ollama pull phi3
3. Start Ollama
   ollama serve

   Runs locally on:
   http://localhost:11434
4. Spring Boot Calls Local AI

POST /api/generate
---

## 💾 Database

### Tables:

* `screening_data` → stores screening payload
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

### AI

ollama serve
---

## 🌐 URLs

* Frontend → http://localhost:3000
* Backend → http://localhost:8080
* H2 Console → http://localhost:8080/h2-console
* Ollama → http://localhost:11434

---

## 🧠 Design Decisions

* Used JSON storage for flexible screening schema
* Ensured consistent field naming across UI → API → DB
* Implemented idempotent identity resolution
* AI layered separately from rules engine
* Local-first privacy-friendly AI
* Designed rule engine to be extensible for future programs

---

## 🚧 Future Enhancements

* Add Intake workflow with document verification
* Integrate rules engine like Drools
* Add authentication (OAuth/JWT)
* Deploy to cloud (AWS/GCP)
* Replace H2 with PostgreSQL
* Multilingual AI assistant
---

## 📸 Screenshots

### Household Information
Household Information
![Household](frontend/public/screenshots/household.jpg)

### Members Details
Members Details
![Members](frontend/public/screenshots/members.jpg)

### Income Details
Income Details
![Income](frontend/public/screenshots/income.jpg)

### Review Screen
Review Screen
![Review](frontend/public/screenshots/review.jpg)

### Eligibility Results
Eligibility Results
![Results](frontend/public/screenshots/result1.jpg)
![Results](frontend/public/screenshots/result1.jpg)

---

## 💡 What This Demonstrates

* Full-stack system design thinking
* Real-world domain modeling (public benefits)
* Clean API + UI contract design
* AI integration in enterprise apps
* Production-grade backend practices

---

## 👨‍💻 Author

**Nitin P**
Java | Spring Boot | React | AI | Enterprise Systems

---

## ⭐ If you found this useful

Give it a star on GitHub!
Thank you.
