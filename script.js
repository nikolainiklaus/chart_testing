const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5c8d3e2f7dmshec218d5aed25c05p118058jsn8e8659f165da",
    "X-RapidAPI-Host": "similar-web.p.rapidapi.com",
  },
};
let domains = ["google.com", "amazon.com"];
const dataPoints = [];
const testData = [12, 19, 3, 5, 2, 3];
const testLabels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

const fetchDomains = async () => {
  try {
    for (let domain of domains) {
      const res = await fetch(
        `https://similar-web.p.rapidapi.com/get-analysis?domain=${domain}`,
        options
      );

      if (res.ok) {
        let data = await res.json();
        dataPoints.push(data);
      }
    }
  } catch (error) {}
  console.log(dataPoints);
  console.log("completed data fetch");
  prepareForRender();
};

const prepareForRender = () => {
  // console.log("teest", dataPoints.length);

  for (let dataPoint of dataPoints) {
    let chartContainerNode = document.getElementById("chart-container-outer");
    chartContainerNode.innerHTML += `<div class="container" id="div${dataPoint.SiteName}"></div>`;
    let visits = dataPoint.EstimatedMonthlyVisits;
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
    renderChart(months, visitsPerMonth, dataPoint.SiteName);
  }
};

function renderChart(labels, data, domain) {
  //generating random text for ctx
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  let ctx = makeid(5);
  // let chartContainerInnerNode = document.getElementById(`div${domain}`);
  // chartContainerInnerNode.innerHTML = `<canvas id="${domain}"></canvas>`;

  let chartContainerInnerNode = document.getElementById(`div${domain}`);
  let canvas = document.createElement("canvas");
  canvas.id = domain;
  chartContainerInnerNode.appendChild(canvas);

  ctx = document.getElementById(domain).getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of Votes",
          data: data,
          borderWidth: 2,
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

  console.log("rendered a chart");
}

window.onload = () => {
  fetchDomains();
};
