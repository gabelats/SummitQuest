const questForm = document.querySelector("#questForm");
const completeQuest = document.querySelector("#completeQuest");

const addQuestHandler = async (event) => {
  event.preventDefault();

  const peakName = document.querySelector("#dropdown2");
  const peak_id = peakName.value;
  const bodyObj = {
    peakId: peak_id,
    completed: false,
  };
  if (bodyObj) {
    const response = await fetch("/api/hikes/", {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("quest saved");
    } else {
      alert(response.statusText);
    }
  }
};

const completeQuestHandler = async (event) => {
  event.preventDefault();

  const peakName = document.querySelector("#dropdown2_2");
  const peak_id = peakName.value;
  const dateInput = document.querySelector("#date").value;
  const journalInput = document.querySelector("#comment").value;
  const completedCheck = document.querySelector("#completed").checked;
  const timeCheck = document.querySelector("#inlineFormCustomSelect");
  const time_chosen = timeCheck.value;
  const bodyObj = {
    peakId: peak_id,
    completed: completedCheck,
    date: dateInput,
    journal: journalInput,
    time_taken: time_chosen,
  };
  console.log(bodyObj);
  if (bodyObj) {
    const response = await fetch("/api/hikes/", {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("quest completed!");
    } else {
      alert(response.statusText);
    }
  }
};

questForm.addEventListener("submit", addQuestHandler);
completeQuest.addEventListener("submit", completeQuestHandler);
