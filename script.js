let currentQuery = "world"
let nextPage = 1
const newsapi = async (page, q) => {
  console.log(`featching news for ${q}, page number ${page}`);

  let url = 'https://newsapi.org/v2/everything?' +
    'q=' + q +
    '&from=2025-04-16&' +
    'pageSize=11&' +
    'language=en&' +
    'page=' + page +
    '&sortBy=popularity&' +
    'apiKey=4a9de8d3cf794e499a9e09fa6553ddc2';

  let data = await fetch(url);
  let response = await data.json();
  console.log(response);

  dispalyNews(response.articles)
}
newsapi(1, currentQuery)

function handleSearch() {
  let query = document.getElementById('search').value
  currentQuery = query
  newsapi(1, query)
}
function previous() {
  let query = document.getElementById('search').value
  if (nextPage > 1) {
    nextPage = nextPage - 1
    // currentQuery = query
    newsapi(nextPage, currentQuery)
  }
}
function next() {
  let query = document.getElementById('search').value
  nextPage = nextPage + 1
  // currentQuery = query
  newsapi(nextPage, currentQuery)
}

const dispalyNews = (articles) => {
  const container = document.getElementById('newsContainer')
  container.innerHTML = ""
  articles?.forEach(article => {
    const card = `<div style="border:1px solid #ccc; padding:10px; margin:10px;">
      <div class="img-div"><img src="${article.urlToImage}" alt="sorry image not availble " srcset=""></div>
          <h3>${article.title}</h3>
        <p>${article.description || 'No description available.'}</p>

        <h6> ${article.author || 'No description available.'}</h6></span>
        
        <h6>${article.author || 'No description available.'}</h6>
          <a href="${article.url}" target="_blank" class="view-button">Read more</a>
        </div>`;
    container.innerHTML += card;

  })
}

const filterNews=(general) =>{
  currentQuery = general
  newsapi(1, currentQuery)
  
}
const sports=(sports) =>{
  currentQuery = sports
  newsapi(1, currentQuery)
  
}
const technology=(technology) =>{
  currentQuery = technology
  newsapi(1, currentQuery)
  
}
const cripto = (crypto) =>{
  currentQuery = crypto
  newsapi(1, currentQuery)
  
}
const entertainment=(entertainment) =>{
  currentQuery = entertainment
  newsapi(1, currentQuery)
  
}
