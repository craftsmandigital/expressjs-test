import express from 'express'
import cors from 'cors'

import { getNotes, getNote, createNote } from './database.js'

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }));

app.use(cors());

// Serve static files
app.use(express.static('public'))

app.get("/notes", async (req, res) => {
  const notes = await getNotes()

  res.send('<h1> halla på deg </h1>'.concat(JSON.stringify(notes)))

})

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id
  const note = await getNote(id)
  res.send(note)
})

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body
  const note = await createNote(title, contents)
  res.status(201).send(note)
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})
