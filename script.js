let currentQuery = "world";
let nextPage = 1;
const apiKey = '27b2ec7802234d1611499996af4ebb25';

const newsapi = async (page, q) => {
  let url = `https://gnews.io/api/v4/search?q=${q}&lang=en&max=10&page=${page}&token=${apiKey}`;

  try {
    let data = await fetch(url);
    if (!data.ok) throw new Error(`Error: ${data.status}`);
    let response = await data.json();

    dispalyNews(response.articles);
  } catch (err) {
    console.error("Fetch error:", err);
    document.getElementById("newsContainer").innerHTML = `
      <p class="text-danger text-center">Sorry! News could not be loaded. Try again later.</p>`;
  }
};

newsapi(1, currentQuery);

function handleSearch() {
  let query = document.getElementById('search').value;
  currentQuery = query;
  nextPage = 1;
  newsapi(1, query);
}

function previous() {
  if (nextPage > 1) {
    nextPage--;
    newsapi(nextPage, currentQuery);
  }
}

function next() {
  nextPage++;
  newsapi(nextPage, currentQuery);
}

const dispalyNews = (articles) => {
  const container = document.getElementById('newsContainer');
  container.innerHTML = "";

  articles?.forEach(article => {
    const card = `<div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
          <div class="card-img-container">
            <img src="${article.image}" class="card-img-top img-fluid news-image" alt="News Image">
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text text-muted">${article.description || "No description available."}</p>
            <div class="mt-auto">
              <p class="mb-1"><strong>Source:</strong> ${article.source.name || "Unknown"}</p>
              <a href="${article.url}" target="_blank" class="view-button">Read more</a>
            </div>
          </div>
        </div>
      </div>`;
    container.innerHTML += card;
  });
}  

const filterNews = (category) => {
  currentQuery = category;
  nextPage = 1;
  newsapi(1, currentQuery);
};
