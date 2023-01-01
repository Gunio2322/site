const express = require('express')
const expressHandlebars = require('express-handlebars').engine
const bodyParser = require("body-parser")
const app = express()
const fortune = require('./lib/fortune')
const { response } = require('express')

// konfiguracja silnika widoków Handlebars
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
}))
// app.engine('handlebars', expressHandlebars({ defaultLayout: 'main'  }))
app.set('view engine', 'handlebars')
// document.write(app.get("vive engine"))

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => { res.render('about', { fortune: fortune.getFortune }

  
  )
 })
app.get('/section-test', (req, res) => { res.render('section-test')})

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

app.listen(port, () =>
  console.log(
    `Server start http://localhost:${port}; ` +
      `naciśnij Ctrl-C, aby zakończyć.`,
  ),
)
// console.log('This example is different!');tw
