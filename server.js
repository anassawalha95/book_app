'use strict'
let c = console
const express = require('express')
const superAgent = require('superagent')

require('dotenv').config();

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))



app.set('view engine', 'ejs')

app.get('/', home);
app.get('/searches/new', newSearch);
app.post('/searches', searchForBooks);
app.post('/searches/show', searchDataViewr);
app.get('*', unknownRoute);
app.use(errorHandler)



function Book(book) {
    this.img_url = book.volumeInfo.imageLinks != null ? book.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
    this.title = book.volumeInfo.title != null ? book.volumeInfo.title : 'Unknow Title';
    this.author = book.volumeInfo.authors != null ? book.volumeInfo.authors : 'Unknow Authors';
    this.description = book.volumeInfo.description != null ? book.volumeInfo.description : 'No Description Available';
}



//Home Route
function home(req, res, next) {
    res.render("pages/index")
}
// Search Render
function newSearch(req, res, next) {
    res.render("pages/searches/new")
}
// Search Handler
function searchForBooks(req, res, next) {
    let searchBy = req.body.bookTitleOrAuthor;
    let filterBy = ''

    if (req.body.filterBy != null)
        filterBy = (req.body.filterBy == "Title") ? `intitle:${searchBy}` : `inauthor:${searchBy}`
    else
        filterBy = searchBy


    let url = `https://www.googleapis.com/books/v1/volumes?q=${filterBy}`

    superAgent.get(url)
        .then(data => {

            let books = data.body.items.map(val => {
                let book = new Book(val);
                return book;
            })

            res.render('pages/searches/show', { allBooks: books });

        }).catch(next);
}

// Search Data Viewer
function searchDataViewr(req, res, next) {
    let searchBy = req.body.bookTitleOrAuthor;
    let filterBy = req.body.filterBy;


}


function unknownRoute(req, res, next) {
    let error = { status: 404, text: "unknown route" }

    res.json(error)
}
function errorHandler(error, req, res, next) {
    res.render('pages/error', { status: 500, text: error });

}



app.listen(PORT, () => {
    c.log(`http://localhost:${PORT}/`)
})
