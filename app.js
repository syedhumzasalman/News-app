// *****************************************************************************************************
// This Section is for Date and Time jo website ke top pe he  

let currentTime = document.getElementById("currentTime")
let currentDay = document.getElementById("currentDay")

currentTime.innerHTML = moment().format('LTS');
currentDay.innerHTML = moment().format('LL');

// *****************************************************************************************************
// this API is integrate for  News Ticker section for lateast News

const apiKey = '8260190a11cd4340abaf3662f0bbfbef';
const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${apiKey}`;
let articleNews = document.getElementById("articleNews")

fetch(url)
.then((res)=> res.json())
.then((data) => {
    // console.log(data.articles[0]);

    let lateastNews = data.articles

    lateastNews.map((art) =>{
        if (art.description) {
            articleNews.innerHTML += `🔹 ${art.description} `;
          }
    })

}).catch((err)=>{
    console.log(err);
})

// *****************************************************************************************************
//

const apiKey1 = '8260190a11cd4340abaf3662f0bbfbef';
const url1 = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey1}`;

fetch(url1)
.then((res) => res.json())
.then((data) => {
    // console.log(data.articles);

    let artticle = data.articles
    let cardNews = document.getElementById("cardNews")

    artticle.map(result => {
        // console.log(result.urlToImage);

        cardNews.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
            <img src="${result.urlToImage}" class="card-img-top" alt="News Image">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${result.title}</h5>
              <p class="card-text text-muted">${result.description || "No description available."}</p>
              <div class="mt-auto">
                <p class="mb-1"><strong>Author:</strong> ${result.author || "Unknown"}</p>
                <p class="text-muted"><small><i class="bi bi-clock"></i> ${new Date(result.publishedAt).toLocaleString()}</small></p>
              </div>
            </div>
          </div>
        </div>`
        
    })
    
    
})
.catch((err) => console.error("Error:", err));