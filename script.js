const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5c8d3e2f7dmshec218d5aed25c05p118058jsn8e8659f165da",
    "X-RapidAPI-Host": "similar-web.p.rapidapi.com",
  },
};

const getDomains = async (domain) => {
  try {
    const res = await fetch(
      `https://similar-web.p.rapidapi.com/get-analysis?domain=${domain}`,
      options
    );

    if (res.ok) {
      let data = await res.json();
      let visits = data.EstimatedMonthlyVisits;
      let months = [];
      let visitsPerMonth = [];

      let keys = Object.keys(visits);
      let values = Object.values(visits);

      keys.forEach((key) => {
        months.push(key);
        console.log(key);
      });
      values.forEach((value) => {
        visitsPerMonth.push(value);
        console.log(value);
      });
      console.log(months);
      console.log(visitsPerMonth);
      renderChart(months, visitsPerMonth);
    }
  } catch (error) {}
};

function renderChart(labels, data) {
  // console.log("called");
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "This week",
          data: data,
        },
      ],
    },
  });
}

window.onload = () => {
  getDomains("openai.com");
};
