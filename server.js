const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dataDefaults = require('./data.defaults.json')
const app = express()


app.use('/', express.static('build'))

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 3000

const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')


// Create database instance and start server
const adapter = new FileAsync('.data/db.json')
low(adapter)
  .then(db => {
    // Routes
    // GET /posts/:id
    app.get('/services', (req, res) => {
      const services = db.get('services')
        .value()

      res.send(services)
    })
    app.get('/services/:id', (req, res) => {
      const service = db.get('services')
        .find({ id: req.params.id })
        .value()

      res.send(service)
    })

    // POST /posts
    app.post('/services', (req, res) => {
      const serviceID = db.get('idCounter').value() + 1;
      db.set('idCounter', serviceID)
        .write()
      
      db.get('services')
        .push(req.body)
        .last()
        .assign({ id: serviceID })
        .write()        
        .then(service => res.send(service))

    })

    // Set db default values
    return db.defaults(dataDefaults).write()
  })
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`))
  })
