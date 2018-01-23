import axios from 'axios'
import path from 'path'
import renderPage from './renderPage';
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../client/App'
import express from 'express'

const port = 8080
const app = express()
const assets = express.static(path.join(__dirname, '../'))

app.use(assets);
app.get('**', (req, res) => {
  axios('https://my-json-server.typicode.com/noevents/order-book-data/db')
    .then(body => {
      const html = renderToString(<App orders={body.data} />)
      
      res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
      res.status(200).send(renderPage(html, body.data))

    })
    .catch((e)=>{
      res.status(404).send(`${e}: can't get initial data`)
      console.log(e)
    })
})

app.listen(port, () => { console.log(`Listening on ${port}.`) })
