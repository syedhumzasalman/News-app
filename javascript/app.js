// *****************************************************************************************************
// This Section is for Date and Time jo website ke top pe he  

let currentTime = document.getElementById("currentTime")
let currentDay = document.getElementById("currentDay")

currentTime.innerHTML = moment().format('LTS');
currentDay.innerHTML = moment().format('LL');


// *****************************************************************************************************
// API Key
const apiKey = ["725c5e130468a69442246669538c3080", "27b2ec7802234d1611499996af4ebb25", 
                "99f67be34756a90cb389070332617b08", "1370bb0b30ad917bf28f2e970875c27a", 
                "1f60f07d4955c4dd6de0c069ce794378", "67acc7dce580f8dd2a8c8d357c668c8b"];

let apiIndex =  Math.floor(Math.random() * apiKey.length);
let finalApi = apiKey[apiIndex]


 


// *****************************************************************************************************
// this API is integrate for  News Ticker section for lateast News


  
  function newsTick() {
    const url = `https://jsonplaceholder.typicode.com/posts`;
  let articleNews = document.getElementById("articleNews")

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      let lateastNews = data

      lateastNews.map((art) => {
        if (art.body) {
          articleNews.innerHTML += `🔹 ${art.body} `;
        }
      })

    }).catch((err) => {
      console.log(err);
    })
  }

  newsTick() 

// *****************************************************************************************************
//


function callAPI() {
 
let url1 = `https://gnews.io/api/v4/search?q=bbc&lang=en&token=${finalApi}`;

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
                  <img src="${result.image  || './images/alt-image.jpg'}"
                   onerror="this.onerror=null;this.src='./images/alt-image.jpg';"
                   class="card-img-top news-image" alt="News Image">
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

callAPI()




// *****************************************************************************************************


async function getNews(category) {
  let url = `https://gnews.io/api/v4/search?q=${category}&lang=en&max=10&token=${finalApi}`;
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
        <img src="${article.image || './images/alt-image.jpg'}"
        onerror="this.onerror=null;this.src='./images/alt-image.jpg';"
        class="card-img-top news-image" alt="News Image">
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${article.title}</h5>
        <p class="card-text text-muted">${article.description || "No description available."}</p>
        <div class="mt-auto">
          <p class="mb-1"><strong>Author:</strong> ${article.source.name || "Unknown"}</p>
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