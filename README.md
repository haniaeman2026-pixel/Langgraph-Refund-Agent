
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:171717,50:30291F,100:171717&height=200&section=header&text=LANGGRAPH%20REFUND%20WORKFLOW&fontSize=30&fontColor=E8D3A4&fontAlignY=43&desc=AI-Powered%20Customer%20Support%20%26%20Refund%20Automation&descSize=13&descColor=F5F0E6&descAlignY=65" width="100%" alt="LangGraph Refund Workflow"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Georgia&weight=500&size=21&pause=1600&color=C7A96B&center=true&vCenter=true&width=650&lines=Intelligent+Customer+Support;Automated+Refund+Workflow;Human-in-the-Loop+Approval" alt="Animated project title"/>

<br/>

**Intelligent workflows. Structured decisions. Human oversight.**

<br/>

![Python](https://img.shields.io/badge/Python-242424?style=flat-square&logo=python&logoColor=E8D3A4)
![FastAPI](https://img.shields.io/badge/FastAPI-242424?style=flat-square&logo=fastapi&logoColor=91D5B5)
![LangGraph](https://img.shields.io/badge/LangGraph-242424?style=flat-square)
![Groq](https://img.shields.io/badge/Groq-242424?style=flat-square)

</div>

---

## Overview

LangGraph Refund Workflow is an AI-powered customer support application that classifies customer requests, identifies order information, and manages refund-related decisions through a structured LangGraph workflow.

Built with FastAPI and Groq, the application combines AI-generated responses with a human review process for requests that require approval.

## Features

- **AI Request Classification** — Classifies customer support messages.
- **Order Identification** — Extracts order IDs and checks available order records.
- **Refund Workflow** — Routes requests through defined workflow steps.
- **Human Review** — Supports approval or rejection of pending requests.
- **AI-Generated Responses** — Produces concise, customer-friendly replies.
- **API Health Monitoring** — Checks backend connectivity.
- **Interactive API Docs** — Explore endpoints through Swagger UI.

## Screenshots

<div align="center">

### Application Interface

<img src="screenshots/home.png" width="95%" alt="Main application interface"/>

### Customer Support Workflow

<img src="screenshots/support.png" width="95%" alt="Customer support request and response"/>

### Human Review

<img src="screenshots/human-review.png" width="95%" alt="Human approval and rejection interface"/>

</div>

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Core application logic |
| LangGraph | Workflow orchestration |
| FastAPI | Backend API |
| Groq | Language model integration |
| HTML & CSS | User interface |
| JavaScript | Frontend interactions |

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/LangGraph-Refund-Workflow.git
cd LangGraph-Refund-Workflow
```

### 2. Create a virtual environment

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

Replace the API key placeholder with your own key. Keep `.env` private and never commit API credentials to GitHub.

### 5. Run the application

```bash
python -m uvicorn main:app --reload
```

Open the application in your browser:

- **Web Application:** http://127.0.0.1:8000
- **Health Check:** http://127.0.0.1:8000/health
- **API Documentation:** http://127.0.0.1:8000/docs

## Security

- Store API keys in environment variables.
- Add `.env` and `.venv/` to `.gitignore`.
- Never publish private credentials or sensitive customer information.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:171717,100:30291F&height=3&section=footer" width="100%" alt=""/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Georgia&weight=500&size=26&pause=1800&color=C7A96B&center=true&vCenter=true&width=500&lines=Developed+by+Hania+Eman" alt="Developed by Hania Eman"/>

**Hania Eman**

*Artificial Intelligence · Python Development · Intelligent Applications*

<br/>

⭐ If you find this project interesting, consider giving it a star.

</div>
