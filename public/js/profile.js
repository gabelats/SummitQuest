const questForm = document.querySelector("#questForm");
const completeQuest = document.querySelector("#completeQuest");

const addQuestHandler = async (event) => {
  event.preventDefault();

  const peakName = document.querySelector("#dropdown2");
  const peakId = peakName.value;
  const bodyObj = {
    peak_id: peakId,
    completed: false,
  };
  if (bodyObj) {
    const response = await fetch("/api/hikes/post", {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      return;
    } else {
      alert(response.statusText);
    }
  }
};

const completeQuestHandler = async (event) => {
  event.preventDefault();

  const peakName = document.querySelector("#dropdown2");
  const peakId = peakName.value;
  const dateInput = document.querySelector("#date").value;
  const journalInput = document.querySelector("#comment").value;
  const completedCheck = document.querySelector("#completed").value;
  const bodyObj = {
    peak_id: peakId,
    completed: completedCheck,
    date: dateInput,
    journal: journalInput,
  };

  if (bodyObj) {
    const response = await fetch("/api/hikes/post", {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      return;
    } else {
      alert(response.statusText);
    }
  }
};

questForm.addEventListener("submit", addQuestHandler);
completeQuest.addEventListener("submit", completeQuestHandler);
