const API_KEY = "cd620374a9984ada920ed972abfa40db";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}
function bindData(articles) {
  const cardContainer = document.getElementById("cards-Container");
  const newsCardTemplate = document.getElementById("newsTemp");

  cardContainer.innerHTML = "";

  articles.forEach((articles) => {
    if (!articles.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, articles);
    cardContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, articles) {
  const newsImg1 = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#cardText1");
  const newsSource = cardClone.querySelector("#cardText2");
  const newsDesc = cardClone.querySelector("#cardText3");
  const newsDate = cardClone.querySelector("#cardText4");

  newsImg1.src = articles.urlToImage;
  newsTitle.innerHTML = articles.title;
  newsDesc.innerHTML = articles.description;

  const date = new Date(articles.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  console.log(date);
  newsSource.innerHTML = `${articles.source.name}`;
  newsDate.innerHTML = `${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(articles.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementsByClassName("class");
  const navItems = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav = navItems;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
