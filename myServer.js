const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const { quotes } = require('./quotesData');

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    let randomQuote = quotes[(Math.floor(Math.random() * quotes.length))];
    console.log(randomQuote);
    res.send({
        quote: randomQuote
    });
})

app.get('/api/quotes', (req, res, next) => {
    let personName = req.query.personName;
    console.log(personName);
    let specificArrayOfQuotes = [];
    if (personName) {
        quotes.forEach(element => {
            if ((element['author']).toLowerCase() == personName) {
                specificArrayOfQuotes.push(element);
            };
        });
        console.log(specificArrayOfQuotes);
        res.send({
            quotes: specificArrayOfQuotes
        })
    } else {
        res.send({
            quotes: quotes
        });
    };
});

app.post('/api/quotes', (req, res, next) => {
    let newQuote = req.query.newQuoteText;
    let newAuthor = req.query.newPersonName;
    console.log(newQuote);
    console.log(newAuthor);
    if (newAuthor && newQuote) {
        quotes.push({
            author: newAuthor,
            quote: newQuote
        })
        res.status(201).send({
            quote: {
                author: newAuthor,
                quote: newQuote
            }
        });
    } else {
        res.status(400).send();
    }
})


app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
})