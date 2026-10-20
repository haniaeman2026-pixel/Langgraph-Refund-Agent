
const $ = (selector) => document.querySelector(selector);

const state = {
  requests: [],
  completed: 0,
  busy: false
};

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function formatJSON(data) {
  try {
    return typeof data === "string" ? data : JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

async function requestJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { detail: text || "The server returned an empty response." };
  }

  if (!response.ok) {
    const detail = data.detail || data.message || data.error;
    throw new Error(
      typeof detail === "string"
        ? detail
        : formatJSON(detail || data)
    );
  }

  return data;
}

function setButtonLoading(button, loading, label) {
  if (loading) {
    button.dataset.originalText = button.innerHTML;
    button.disabled = true;
    button.textContent = label || "Please wait…";
  } else {
    button.disabled = false;
    if (button.dataset.originalText) {
      button.innerHTML = button.dataset.originalText;
      delete button.dataset.originalText;
    }
  }
}

function getResultText(data) {
  if (data && typeof data === "object") {
    return (
      data.response ||
      data.answer ||
      data.message ||
      data.result ||
      data.output ||
      formatJSON(data)
    );
  }

  return String(data);
}

function updateRequestStats() {
  $("#totalRequests").textContent = state.requests.length;
  $("#completedRequests").textContent = state.completed;

  const pending = state.requests.filter(
    (item) => item.status === "Awaiting review"
  ).length;

  $("#pendingReviews").textContent = pending;
  $("#reviewBadge").textContent = pending;
}

function addHistory(threadId, status, result) {
  const item = {
    threadId,
    status,
    result,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  state.requests.unshift(item);
  state.requests = state.requests.slice(0, 50);

  renderHistory();
  updateRequestStats();
}

function renderHistory() {
  const tbody = $("#historyTable");
  tbody.replaceChildren();

  if (!state.requests.length) {
    const row = document.createElement("tr");
    row.className = "empty-row";

    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No requests submitted in this session yet.";

    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  state.requests.forEach((item) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = item.threadId;

    const statusCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = "table-status";

    if (item.status === "Completed") {
      badge.classList.add("success");
    } else if (item.status === "Failed") {
      badge.classList.add("error");
    }

    badge.textContent = item.status;
    statusCell.appendChild(badge);

    const resultCell = document.createElement("td");
    resultCell.textContent = item.result;

    const timeCell = document.createElement("td");
    timeCell.textContent = item.time;

    row.append(idCell, statusCell, resultCell, timeCell);
    tbody.appendChild(row);
  });
}

function showSupportResult(data, failed = false) {
  $("#supportResult").classList.remove("hidden");
  $("#resultStatus").textContent = failed ? "Failed" : "Response received";
  $("#resultContent").textContent = formatJSON(data);
  $("#resultStatus").style.color = failed ? "#a13d37" : "#26734e";
}

function showReviewResult(data) {
  $("#reviewResult").classList.remove("hidden");
  $("#reviewResultContent").textContent = formatJSON(data);
}

function getThreadId() {
  return $("#threadId").value.trim();
}

// Sidebar navigation
document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-view]").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const views = {
      overview: ".welcome-banner",
      "new-request": "#requestPanel",
      "human-review": "#reviewPanel",
      history: "#historyPanel",
      "api-health": ".health-panel"
    };

    const target = document.querySelector(views[button.dataset.view]);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    $("#sidebar").classList.remove("open");
  });
});

// Mobile navigation
$("#mobileMenu").addEventListener("click", () => {
  $("#sidebar").classList.toggle("open");
});

// Generate a fresh thread identifier
$("#generateThread").addEventListener("click", () => {
  const suffix = Math.random().toString(36).slice(2, 7);
  $("#threadId").value = `refund-${new Date().getFullYear()}-${suffix}`;
});

// Sample customer request
$("#useSample").addEventListener("click", () => {
  $("#customerMessage").value =
    "I received a damaged product and would like to request a refund. My order number is ORD-12345.";

  if (!getThreadId()) {
    $("#threadId").value = `refund-${new Date().getFullYear()}-001`;
  }

  showToast("Sample request added. You can edit it before submitting.");
});

// Submit support request
$("#supportForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  if (state.busy) return;

  const threadId = getThreadId();
  const message = $("#customerMessage").value.trim();

  if (!threadId || !message) {
    showToast("Please enter both a thread ID and customer message.");
    return;
  }

  const button = $("#submitSupport");
  state.busy = true;
  setButtonLoading(button, true, "Running workflow…");
  $("#supportResult").classList.add("hidden");

  try {
    const data = await requestJSON("/support", {
      method: "POST",
      body: JSON.stringify({
        thread_id: threadId,
        message
      })
    });

    const responseText = getResultText(data);
    const lowerText = formatJSON(data).toLowerCase();

    const awaitingReview =
      lowerText.includes("interrupt") ||
      lowerText.includes("awaiting review") ||
      lowerText.includes("pending approval") ||
      lowerText.includes("human approval");

    showSupportResult(data);

    if (awaitingReview) {
      $("#reviewThreadId").value = threadId;
      addHistory(threadId, "Awaiting review", "Approval required");
      showToast("Workflow returned a result that may require human review.");
    } else {
      state.completed += 1;
      addHistory(threadId, "Completed", responseText.slice(0, 100));
      showToast("Support workflow returned a response.");
    }
  } catch (error) {
    showSupportResult({ error: error.message }, true);
    addHistory(threadId, "Failed", error.message.slice(0, 100));
    showToast(`Support request failed: ${error.message}`);
  } finally {
    state.busy = false;
    setButtonLoading(button, false);
  }
});

// Submit human review
$("#reviewForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const threadId = $("#reviewThreadId").value.trim();
  const decision = $("#reviewDecision").value;

  if (!threadId) {
    showToast("Enter the thread ID that needs review.");
    return;
  }

  const button = $("#submitReview");
  setButtonLoading(button, true, "Submitting review…");
  $("#reviewResult").classList.add("hidden");

  try {
    /*
     * This sends a JSON body containing "decision".
     * If your existing main.py expects a different review payload,
     * adjust this request to match that endpoint's schema.
     */
    const data = await requestJSON(
      `/review/${encodeURIComponent(threadId)}`,
      {
        method: "POST",
        body: JSON.stringify({ decision })
      }
    );

    showReviewResult(data);

    const item = state.requests.find(
      (request) => request.threadId === threadId
    );

    if (item) {
      item.status = "Completed";
      item.result = `Review submitted: ${decision}`;
      state.completed += 1;
      renderHistory();
      updateRequestStats();
    }

    showToast("Review endpoint returned a successful response.");
  } catch (error) {
    showReviewResult({ error: error.message });
    showToast(`Review failed: ${error.message}`);
  } finally {
    setButtonLoading(button, false);
  }
});

// Copy latest support result
$("#copyResult").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText($("#resultContent").textContent);
    showToast("Result copied to clipboard.");
  } catch {
    showToast("Clipboard access is unavailable in this browser.");
  }
});

// Clear this browser session's request list
$("#clearHistory").addEventListener("click", () => {
  state.requests = [];
  state.completed = 0;
  renderHistory();
  updateRequestStats();
  showToast("Session history cleared.");
});

// Check backend health
async function refreshHealth() {
  const button = $("#refreshHealth");

  if (button) setButtonLoading(button, true, "Checking…");

  $("#healthOutput").textContent = "Checking backend status…";
  $("#fastApiHealth").textContent = "Checking…";

  try {
    const data = await requestJSON("/health");

    $("#apiStat").textContent = "Online";
    $("#apiStatNote").textContent = "Health endpoint responded";
    $("#apiBadge").textContent = "Healthy";
    $("#healthPill").textContent = "API Online";
    $("#sidebarApiStatus").textContent = "API Connected";
    $("#fastApiHealth").textContent = "Connected";
    $("#healthOutput").textContent = formatJSON(data);

    showToast("API health check successful.");
  } catch (error) {
    $("#apiStat").textContent = "Offline";
    $("#apiStatNote").textContent = "Could not reach health endpoint";
    $("#apiBadge").textContent = "Unavailable";
    $("#healthPill").textContent = "Unavailable";
    $("#sidebarApiStatus").textContent = "Connection issue";
    $("#fastApiHealth").textContent = "Unavailable";
    $("#healthOutput").textContent = formatJSON({
      status: "error",
      message: error.message
    });
  } finally {
    if (button) setButtonLoading(button, false);
  }
}

$("#refreshHealth").addEventListener("click", refreshHealth);

// Initial dashboard state
renderHistory();
updateRequestStats();
refreshHealth();
