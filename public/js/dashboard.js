document.addEventListener("DOMContentLoaded", () => {
  const featuredPeak = document.getElementById("FeateredPeaks");

  featuredPeak.addEventListener("click", (event) => {
    event.preventDefault();

    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];

    fetch(`/api/peaks/${id}`, {
      method: "GET",
      body: JSON.stringify({
        peak_name,
        location,
        elevation,
        difficulty,
        permit_required,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New Featured Peak", data);
      })
      .catch((error) => {
        console.error("There was an error updating the Featured Peak", error);
        alert("Error trying to update Featured peak. Please try again later");
      });
  });
});
