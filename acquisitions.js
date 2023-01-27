const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "line ",
  data: {
    labels: months,
    datasets: [
      {
        label: "# of Votes",
        data: visits,
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
