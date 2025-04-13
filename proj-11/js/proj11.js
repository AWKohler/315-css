// XHR version
// Instantiate the XHR request
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', true);
// Set the content type header
xhr.responseType = 'json';

// Prepare the function that is run after the request
xhr.onload = function () {
    // 200 means successful
  if (xhr.status === 200) {
    // Get the html element we will be filling
    const content = document.getElementById('xhrContent');

    let list = '';
    list += '<ul>'
    for (let i = 0; i < 8; i++){
    
        // Build the list of Cryptos
        list += '<li class="coin-item" style="background-color: ' + (xhr.response[i].price_change_percentage_24h >= 0 ? '#2ecc71' : '#cc6b2e') + ';">'
        
        list += '<div class="coin-info">'
        list += '<img src="' + xhr.response[i].image + '" class="thumbNail"></img>'
        list += '<span class="nameField">' + xhr.response[i].name + '</span>'
        list += '<span class="valueField">$' + xhr.response[i].current_price + '</span>'
        list += '<span class="symbolField">Symbol: ' + xhr.response[i].symbol + '</span>'
        list += '<span class="marketCapField">Market Cap: $' + xhr.response[i].market_cap + '</span>'
        list += '<span class="changeField">1 day change: ' + xhr.response[i].price_change_24h + '</span>'
        list += '<span class="changeField">1 day Change %: ' + xhr.response[i].price_change_percentage_24h + '</span>'
        list += '</div>'
        
        list += '</li>'
    }
    list += '</ul>'

    // Set the inner html
    content.innerHTML = list;
  } else {
    // If there is an http error
    // send the error to the UI
    const content = document.getElementById('xhrContent');
    content.innerHTML = `HTTP error! status: ${xhr.status}`;
    console.error(`HTTP error, status: ${xhr.status}`);
  }
};

// Set the on error function for if there is an XHR error
xhr.onerror = function () {

    // send the error to the UI
    const content = document.getElementById('xhrContent');
    content.innerHTML = 'XHR error: ' + xhr.status;

    console.error('XHR error:', xhr.status);
};

// Send the request
xhr.send();

// Fetch version, same API
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')

    // Set the code that runs after the fetch completes
  .then(response => {
    // If there is an http error
    if (!response.ok) {

      // send the error to the UI
      const content = document.getElementById('fetchContent');
      content.innerHTML = `HTTP error! status: ${response.status}`;
      throw new Error(`HTTP error, status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
     // Get the html element we will be filling
    const content = document.getElementById('fetchContent');

    let list = '<ul>';
    for (let i = 0; i < 8; i++) {
      const coin = data[i];

      // Build the list of Cryptos
      list += '<li class="coin-item" style="background-color: ' + (xhr.response[i].price_change_percentage_24h >= 0 ? '#2ecc71' : '#cc6b2e') + ';">'
        
      list += '<div class="coin-info">'
      list += '<img src="' + xhr.response[i].image + '" class="thumbNail"></img>'
      list += '<span class="nameField">' + xhr.response[i].name + '</span>'
      list += '<span class="valueField">$' + xhr.response[i].current_price + '</span>'
      list += '<span class="symbolField">Symbol: ' + xhr.response[i].symbol + '</span>'
      list += '<span class="marketCapField">Market Cap: $' + xhr.response[i].market_cap + '</span>'
      list += '<span class="changeField">1 day change: ' + xhr.response[i].price_change_24h.toFixed(3) + '</span>'
      list += '<span class="changeField">1 day Change %: ' + xhr.response[i].price_change_percentage_24h + '</span>'
      list += '</div>'
        
      list += '</li>'
    }
    list += '</ul>';

    // Set the inner html
    content.innerHTML = list;
  })

    // If there is a fetch error
  .catch(error => {
    // send the error to the UI
    const content = document.getElementById('fetchContent');
    content.innerHTML = 'Fetch error: ' + error;
    console.error('Fetch error:', error);
  });
