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
      console.log(data);
    }
  } catch (error) {}
};

window.onload = () => {
  getDomains("avatarai.me");
};
