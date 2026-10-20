 <div align="center">

# ✨ LangGraph Refund Workflow

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=D6B77A&center=true&vCenter=true&width=600&lines=AI-Powered+Customer+Support;Intelligent+Refund+Workflow;Human-in-the-Loop+Approval" alt="Animated project introduction" />
</a>

**An AI-powered customer support and refund workflow built with LangGraph, FastAPI, and Groq.**

[Features](#-features) · [Screenshots](#-screenshots) · [Installation](#-installation) · [Usage](#-usage)

</div>

---

## 🚀 Overview

LangGraph Refund Workflow is an AI-powered application that processes customer support requests, classifies customer intent, checks order information, and manages refund decisions through a structured workflow.

It includes human-in-the-loop review for requests that require approval, along with a web interface for interacting with the system.

## ✨ Features

- **AI Request Classification** — Understands customer support requests.
- **Order Identification** — Extracts order IDs from customer messages.
- **Refund Workflow** — Processes requests through defined workflow steps.
- **Human Review** — Supports approval or rejection of pending requests.
- **Interactive Web UI** — Provides a clean interface for submitting requests.
- **Health Monitoring** — Checks backend connectivity.
- **API Documentation** — Explore endpoints through FastAPI Swagger UI.

## 🛠️ Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-1C3C3C?style=flat-square)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## 📸 Screenshots

Add your actual project screenshots to the `screenshots/` folder and display them here.

<div align="center">

### Application Interface

<img src="screenshots/home.png" alt="Application home page" width="850" />

### Customer Support Workflow

<img src="screenshots/support.png" alt="Customer support workflow" width="850" />

### Human Review

<img src="screenshots/human-review.png" alt="Human approval and rejection interface" width="850" />

</div>

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/LangGraph-Refund-Workflow.git
cd LangGraph-Refund-Workflow
```

### 2. Create a virtual environment

**Windows:**

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
```

Replace the placeholder with your own Groq API key. Never commit your `.env` file or expose your API key publicly.

## ▶️ Usage

Start the application from the project directory:

```bash
python -m uvicorn main:app --reload
```

Open the following URLs in your browser:

| Service | URL |
|---|---|
| Web Application | http://127.0.0.1:8000 |
| API Health | http://127.0.0.1:8000/health |
| Swagger Documentation | http://127.0.0.1:8000/docs |

Submit a customer request, review the workflow response, and use the Human Review interface when a request is awaiting approval.

## 🔐 Security

- Keep API keys in environment variables.
- Exclude `.env` and `.venv/` from version control.
- Never publish private credentials or sensitive customer information.

## 👩‍💻 Developer

<div align="center">

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&pause=1000&color=D6B77A&center=true&vCenter=true&width=450&lines=Developed+by+Haneeman+%E2%9C%A8;AI+%26+Data+Science+Enthusiast" alt="Developed by Haneeman" />
</a>

**Haneeman**

*Building intelligent applications with AI.*

</div>

---

<div align="center">

⭐ If you find this project interesting, consider giving it a star!

**LangGraph Refund Workflow · Built with AI**

</div>
