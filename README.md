 <div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:171717,50:30291F,100:171717&height=200&section=header&text=LANGGRAPH%20REFUND%20WORKFLOW&fontSize=30&fontColor=E8D3A4&fontAlignY=43&desc=Intelligent%20Customer%20Support%20%7C%20AI%20Refund%20Automation&descSize=13&descColor=F5F0E6&descAlignY=65" width="100%" alt="LangGraph Refund Workflow"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Georgia&weight=500&size=21&pause=1600&color=C7A96B&center=true&vCenter=true&width=650&lines=AI-Powered+Customer+Support;Structured+Refund+Decision+Workflow;Human-in-the-Loop+Review" alt="Animated introduction"/>

**A streamlined AI workflow for customer support, order classification, and refund decision management.**

<br/>

![Python](https://img.shields.io/badge/Python-242424?style=flat-square&logo=python&logoColor=E8D3A4)
![FastAPI](https://img.shields.io/badge/FastAPI-242424?style=flat-square&logo=fastapi&logoColor=91D5B5)
![LangGraph](https://img.shields.io/badge/LangGraph-242424?style=flat-square&logoColor=E8D3A4)
![Groq](https://img.shields.io/badge/Groq-242424?style=flat-square&logoColor=E8D3A4)

</div>

---

## Project Overview

LangGraph Refund Workflow is an AI-powered customer support application designed to classify incoming requests, identify order information, and coordinate refund-related decisions through a structured LangGraph workflow.

The application combines a FastAPI backend with an interactive web interface and human review for requests that require approval.

## Core Capabilities

- **Request Classification** — Categorizes customer support messages.
- **Order Lookup** — Identifies order IDs and checks available order records.
- **Refund Decisions** — Routes requests through the configured workflow.
- **Human Review** — Supports approval or rejection of pending requests.
- **AI-Generated Responses** — Produces concise, customer-friendly replies.
- **API Monitoring** — Includes a health endpoint and interactive API documentation.

## Screenshots

<div align="center">

### Application Interface

<img src="screenshots/home.png" width="92%" alt="Main application interface"/>

*Main interface and application layout*

<br/>

### Customer Support

<img src="screenshots/support.png" width="92%" alt="Customer support workflow"/>

*Customer request and AI response*

<br/>

### Human Review

<img src="screenshots/human-review.png" width="92%" alt="Human review interface"/>

*Refund approval and rejection interface*

</div>

## Technology

| Component | Technology |
|---|---|
| Language | Python |
| API Framework | FastAPI |
| Workflow Orchestration | LangGraph |
| Language Model Provider | Groq |
| Frontend | HTML, CSS, JavaScript |

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/LangGraph-Refund-Workflow.git
cd LangGraph-Refund-Workflow
```

**2. Create and activate a virtual environment**

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**3. Install dependencies**

```bash
pip install -r requirements.txt
```

**4. Configure `.env`**

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
```

Keep your real API key private. Do not commit `.env` to GitHub.

**5. Run the application**

```bash
python -m uvicorn main:app --reload
```

Open `http://127.0.0.1:8000` to access the application.

API health: `http://127.0.0.1:8000/health`

API documentation: `http://127.0.0.1:8000/docs`

---


---

<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=rect&color=1B1A18&height=140&section=footer&text=Developed%20by%20Hania%20Eman&fontSize=32&fontColor=E8D4A2&animation=fadeIn&fontAlignY=50" width="100%" alt="Developed by Hania Eman" />

  <p>
    <strong>LangGraph Refund Workflow</strong>
  </p>

  <p>
    Intelligent Customer Support | AI Refund Automation
  </p>

</div>


*Artificial Intelligence · Intelligent Applications · Python Development*

</div>
