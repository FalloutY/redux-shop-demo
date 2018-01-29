import express from 'express';
import  bodyParser from 'body-parser';
import morgan from 'morgan';
import dataDefaults from './data.defaults.json';
import renderFullPage from './serverUtils';
import { renderToString } from 'react-dom/server';
import App from './src/App'
import actions from './src/actions';
import {createStore, applyMiddleware } from 'redux';
import  reducer, {initialState} from './src/reducer';
import { thunk } from './src/middlewares' 
import { Provider } from 'react-redux';
import React from 'react';

const app = express()

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

const handleRender = (req, res) => {

  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  store.dispatch( actions.getProducts() )
    .then(
      () => {
        console.log("here");
        const html = renderToString(
          <Provider store={store}>
            <App />
          </Provider>
        );

        const finalState = store.getState()

        res.send(renderFullPage(html, finalState));
      }
    )
    .catch(err => res.send(err));
}

app.get('/', handleRender);

app.use('/', express.static('build'))



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
