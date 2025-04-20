let currentQuery = "world";
const apiKey = ["725c5e130468a69442246669538c3080", "27b2ec7802234d1611499996af4ebb25", 
                "99f67be34756a90cb389070332617b08", "1370bb0b30ad917bf28f2e970875c27a", 
                "1f60f07d4955c4dd6de0c069ce794378", "104c2b1060f67afb811b13bcdd5465ca",
                "bd326d29d9a8f58956461f7129c27dad"];

let apiIndex = Math.floor(Math.random() * apiKey.length);
let finalApi = apiKey[apiIndex]

const newsapi = async (q) => {
  let url = `https://gnews.io/api/v4/search?q=${q}&lang=en&max=10&token=${finalApi}`;

  try {
    let data = await fetch(url);
    if (!data.ok) throw new Error(`Error: ${data.status}`);
    let response = await data.json();

    dispalyNews(response.articles);
  } catch (err) {
    console.error("Fetch error:", err);
    document.getElementById("newsContainer").innerHTML = `
      <p class="text-danger text-center">Sorry! News could not be loaded because the API limit has been exceeded. Please try again later.</p>`;
  }
};

newsapi(currentQuery);

function handleSearch() {
  let query = document.getElementById('search').value.trim();

  if (!/^[a-zA-Z\s]{3,}$/.test(query)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Search!',
      text: 'Please enter a valid word with at least 3 letters and no numbers or symbols.',
      confirmButtonColor: '#d33',
    });
    return;
  }

  currentQuery = query;
  newsapi(query);
}



const dispalyNews = (articles) => {
  const container = document.getElementById('newsContainer');
  container.innerHTML = "";

  articles.forEach(article => {
    const card = `<div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
          <div class="card-img-container">
            <img src="${article.image || './images/alt-image.jpg'}" 
             onerror="this.onerror=null;this.src='./images/alt-image.jpg';"
             class="card-img-top img-fluid news-image" alt="News Image">
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
  newsapi(currentQuery);
};
