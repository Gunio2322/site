
const fortune = require('./lib/fortune')
const express = require('express')
const expressHandlebars = require('express-handlebars').engine

const app = express()

// konfiguracja silnika widoków Handlebars
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

// const fortunes = [
//   "Pokonaj swoje lęki albo one pokonają ciebie.",
//   "Rzeki potrzebują źródeł.",
//   "Nie obawiaj się nieznanego.",
//   "Oczekuj przyjemnej niespodzianki.",
//   "Zawsze szukaj prostego rozwiązania.",
// ]

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() } )
})

// niestandardowa strona 404
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// niestandardowa strona 500
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express został uruchomiony pod adresem http://localhost:${port}; ` +
  `naciśnij Ctrl-C, aby zakończyć.`))