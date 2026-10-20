
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:171717,50:30291F,100:171717&height=200&section=header&text=LANGGRAPH%20REFUND%20WORKFLOW&fontSize=30&fontColor=E8D3A4&fontAlignY=43&desc=Intelligent%20Customer%20Support%20%7C%20AI%20Refund%20Automation&descSize=13&descColor=F5F0E6&descAlignY=65" width="100%" alt="LangGraph Refund Workflow"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Georgia&weight=500&size=21&pause=1600&color=C7A96B&center=true&vCenter=true&width=650&lines=AI-Powered+Customer+Support;Structured+Refund+Decision+Workflow;Human-in-the-Loop+Review" alt="Animated project introduction"/>

<br/>

**An intelligent workflow for customer support, order classification, and refund decision management.**

<br/>

![Python](https://img.shields.io/badge/Python-242424?style=flat-square&logo=python&logoColor=E8D3A4)
![FastAPI](https://img.shields.io/badge/FastAPI-242424?style=flat-square&logo=fastapi&logoColor=91D5B5)
![LangGraph](https://img.shields.io/badge/LangGraph-242424?style=flat-square&logoColor=E8D3A4)
![Groq](https://img.shields.io/badge/Groq-242424?style=flat-square&logoColor=E8D3A4)

</div>

---

## Project Overview

LangGraph Refund Workflow is an AI-powered customer support application that classifies incoming requests, checks available order information, and coordinates refund-related decisions through a structured LangGraph workflow.

The application combines a FastAPI backend, an interactive web interface, and human review for requests that require approval.

## Core Features

- **Request Classification** — Categorizes incoming customer support messages.
- **Order Lookup** — Extracts order IDs and checks available order records.
- **Refund Decision Workflow** — Routes requests through the configured decision process.
- **Human-in-the-Loop Review** — Supports approval or rejection of requests awaiting review.
- **AI-Generated Responses** — Generates customer-friendly support replies.
- **API Health Check** — Provides a health endpoint and interactive API documentation.


---

## Technology Stack

| Component | Technology |
|---|---|
| Programming Language | Python |
| Backend Framework | FastAPI |
| Workflow Orchestration | LangGraph |
| Language Model Provider | Groq |
| Frontend | HTML, CSS, JavaScript |

---

## Installation and Setup

### 1. Clone the repository

Replace `YOUR-USERNAME` with your GitHub username.

```bash
git clone https://github.com/haniaeman2026/LangGraph-Refund-Workflow.git
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

Create a `.env` file in the location expected by your application:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
```

Keep your real API key private. Never upload your `.env` file to GitHub.

### 5. Start the application

```bash
python -m uvicorn main:app --reload
```

Open the following URLs in your browser:

- **Application:** http://127.0.0.1:8000
- **Health Check:** http://127.0.0.1:8000/health
- **API Documentation:** http://127.0.0.1:8000/docs

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:171717,50:30291F,100:171717&height=150&section=footer&text=Developed%20by%20Hania%20Eman&fontSize=30&fontColor=E8D3A4&fontAlignY=48&animation=fadeIn" width="100%" alt="Developed by Hania Eman"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Georgia&weight=500&size=17&pause=1800&color=C7A96B&center=true&vCenter=true&width=650&lines=AI+%26+Data+Science;Python+%7C+FastAPI+%7C+LangGraph;Building+Intelligent+Applications" alt="Developer specialties"/>

**LangGraph Refund Workflow**

<sub>Intelligent Customer Support · AI Refund Automation</sub>

</div>
