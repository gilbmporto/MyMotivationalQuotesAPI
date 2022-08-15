//Declare the HTML Buttons and Elements
const getRandomQuoteButton = document.getElementById('getRandomQuoteBtn');
const getAllQuotesButton = document.getElementById('getAllQuotesBtn');
const getQuoteByPersonNameButton = document.getElementById('getQuoteByPersonNameBtn');
const displayQuotesContainer = document.getElementById('divWhereItHappens');
const personNameInput = document.getElementById('personName');

//Function to clear the container
function resetContainer() {
    displayQuotesContainer.innerHTML = '';
}

//function to render errors if it happens
function renderError(response) {
    displayQuotesContainer.innerHTML = `<p>Your request returned an error from the server: </p>
    <p>Code: ${response.status}</p>
    <p>${response.statusText}</p>`;
}

//function to render the quotes based on what button the user presses
function renderQuotes(quotesArray = []) {
    resetContainer();
    if (quotesArray.length > 0) {
        quotesArray.forEach(quote => {
            const oneMoreQuote = document.createElement('div');
            oneMoreQuote.setAttribute('class', 'single-quote');
            oneMoreQuote.innerHTML = `<p>${quote['quote']}</p>
            <h4>${quote['author']}</h4>`;
            displayQuotesContainer.appendChild(oneMoreQuote);
        })
    } else {
        displayQuotesContainer.innerHTML = '<p>Your request returned no quotes whatsoever.</p>'
    }
};

//async function to get a random quote

const getRandomQuote = async () => {
    try {
        let response = await fetch('/api/quotes/random');
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            renderQuotes([jsonResponse.quote]);
        } else {
            throw new Error ('Request failed somehow!')
        }
    } catch (err) {
        console.log(err)
    }
}

//async function to see all the quotes simultaneously
const getAllQuotesNow = async () => {
    try {
        let response = await fetch('/api/quotes/');
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            renderQuotes(jsonResponse.quotes);
        } else {
            throw new Error ('Request failed somehow!')
        }
    } catch (err) {
        console.log(err)
    }
}

//async function to get quote by author name
const getQuotesByName = async () => {
    let personName = personNameInput.value
    console.log('This is the person name: ' + personName)
    try {
        let response = await fetch(`/api/quotes?personName=${personName}`);
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse.quotes);
            renderQuotes(jsonResponse.quotes);
        } else {
            throw new Error ('Something has gone wrong')
        };
    } catch (err) {
        console.log(err);
    };
};

getRandomQuoteButton.addEventListener('click', getRandomQuote);
getAllQuotesButton.addEventListener('click', getAllQuotesNow);
getQuoteByPersonNameButton.addEventListener('click', getQuotesByName);