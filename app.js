// *****************************************************************************************************
// This Section is for Date and Time jo website ke top pe he  

let currentTime = document.getElementById("currentTime")
let currentDay = document.getElementById("currentDay")

currentTime.innerHTML = moment().format('LTS');
currentDay.innerHTML = moment().format('LL');

// *****************************************************************************************************
// this API is integrate for  News Ticker section for lateast News

function newsTicket() {
  const apiKey = '27b2ec7802234d1611499996af4ebb25';
  const url = `https://gnews.io/api/v4/top-headlines?lang=en&token=${apiKey}`;
  let articleNews = document.getElementById("articleNews")

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.articles[0]);

      let lateastNews = data.articles

      lateastNews.map((art) => {
        if (art.description) {
          articleNews.innerHTML += `🔹 ${art.description} `;
        }
      })

    }).catch((err) => {
      console.log(err);
    })
}

// *****************************************************************************************************
//


function callAPI() {
  let apiKey1 = '27b2ec7802234d1611499996af4ebb25';
let url1 = `https://gnews.io/api/v4/search?q=bbc&lang=en&token=${apiKey1}`;

fetch(url1)
  .then((res) => res.json())
  .then((data) => {
    let articles = data.articles;
    let cardNews = document.getElementById("cardNews");

    if (articles && articles.length > 0) {
      articles.map(result => {
        cardNews.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <div class="card-img-container">
                  <img src="${result.image}" class="card-img-top news-image" alt="News Image">
                </div>
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${result.title}</h5>
                  <p class="card-text text-muted">${result.description || "No description available."}</p>
                  <div class="mt-auto">
                    <p class="mb-1"><strong>Source:</strong> ${result.source.name || "Unknown"}</p>
                    <p class="text-muted"><small><i class="bi bi-clock"></i> ${new Date(result.publishedAt).toLocaleString()}</small></p>
                  </div>
                </div>
              </div>
            </div>
          `;
      });

    } else {
      cardNews.innerHTML = "<p>No news articles found.</p>";
    }
  })
  .catch((err) => console.error("Error:", err));

}




// *****************************************************************************************************


async function getNews(category) {
  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=pk&max=10&apikey=27b2ec7802234d1611499996af4ebb25`;
  cardNews.innerHTML = '<p>Loading...</p>';


  try {
    const res = await fetch(url);
    const data = await res.json();

    // console.log(data);


    if (data.articles) {
      cardNews.innerHTML = '';
      data.articles.forEach(article => {

        cardNews.innerHTML += `
  <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
    <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="card-img-container">
        <img src="${article.image || "https://media.proprofs.com/images/QM/user_images/1826446/New%20Project%20(50)(55).webp"}" class="card-img-top news-image" alt="News Image">
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${article.title}</h5>
        <p class="card-text text-muted">${article.description || "No description available."}</p>
        <div class="mt-auto">
          <p class="mb-1"><strong>Author:</strong> ${article.author || "Unknown"}</p>
          <p class="text-muted"><small><i class="bi bi-clock"></i> ${new Date(article.publishedAt).toLocaleString()}</small></p>
        </div>
      </div>
    </div>
  </div>
`;
      })
    } else {
      cardNews.innerHTML = '<p>No news found.</p>';
    }
  } catch (error) {
    console.error(error);
    cardNews.innerHTML = '<p>Error fetching news.</p>';
  }
}