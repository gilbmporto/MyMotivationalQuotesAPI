//Define HTML elements
var newAuthor = document.getElementById('newPersonName');
var newQuote = document.getElementById('newQuoteText');
const postItButton = document.getElementById('postIt');
const containerDiv2 = document.getElementById('divWhereItHappens2');

//async function to produce the POST request
async function postNewQuote() {
    try {
        let response = await fetch(`/api/quotes?newQuoteText=${newQuote.value}&newPersonName=${newAuthor.value}`, 
        {
            method: 'POST',
        });
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            const newQuoteElement = document.createElement('div');
            newQuoteElement.setAttribute('class', 'new-quote-add');
            newQuoteElement.innerHTML = `
            <h4>Your quote was successfully added!</h4>
            <div class="quoteText">${jsonResponse.quote.quote}</div>
            <div class="quoteAuthor">${jsonResponse.quote.author}</div>`;
            containerDiv2.appendChild(newQuoteElement);
        } else {
            throw new Error('Something has gone wrong!')
        }
    } catch (err) {
        console.log(err);
    };
};

postItButton.addEventListener('click', postNewQuote);