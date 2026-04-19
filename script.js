const poll = document.querySelector("#family-poll");
const result = document.querySelector("#poll-result");

if (poll && result) {
  poll.addEventListener("submit", (event) => {
    event.preventDefault();

    const choice = new FormData(poll).get("vote");

    result.textContent = choice
      ? `Current favorite: ${choice}. Family parliament has recorded your vote.`
      : "Select one option before submitting the family vote.";
  });
}
