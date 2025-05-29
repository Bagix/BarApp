import Express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = Express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.port || 3000
app.listen(port)

const CONNETCTION_STRING =
  'mongodb+srv://borsuk1253:0YUxMmPzz83p9xdO@cluster0.ek76qvf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(CONNETCTION_STRING)
const database = client.db('cocktailapp')
const collection = database.collection('cocktails')

/**
 * --------------------- API END POINTS ---------------------
 */

app.get('/api/get-items', async (req, res) => {
  const response = await getItems(req.query.pagination, req.query.limit)
  res.json(response)
})

app.get('/api/search', async (req, res) => {
  const response = await getItemsByName(req.query.pagination, req.query.limit, req.query.search)
  res.json(response)
})

app.post('/api/add', async (req, res) => {
  const response = await add(req.body)
  res.json(response)
})

app.put('/api/edit', async (req, res) => {
  const response = await edit(req.body)
  res.json(response)
})

app.delete('/api/delete', async (req, res) => {
  const response = await remove(req.body)
  res.json(response)
})

/**
 * --------------------- METHODS ---------------------
 */

async function getItems(pagination, limit) {
  try {
    const items = await collection.find({}).skip(Number(pagination)).limit(Number(limit)).toArray()

    return items
  } catch (err) {
    console.error(`Something went wrong trying to get documents: ${err}\n`)
  }
}

async function getItemsByName(pagination, limit, search) {
  try {
    const items = await collection
      .find({
        $text: {
          $search: search,
        },
      })
      .skip(Number(pagination))
      .limit(Number(limit))
      .toArray()

    return items
  } catch (err) {
    console.error(`Something went wrong trying to get documents by phrase ${search}: ${err}\n`)
  }
}

async function add(data) {
  try {
    const insertedItem = await collection.insertOne(data)
    return insertedItem
  } catch (err) {
    console.error(`Something went wrong trying to insert the new document: ${err}\n`)
  }
}

async function edit(data) {
  try {
    const preparedData = { ...data }
    delete preparedData.id

    const insertedItem = await collection.updateOne(
      { _id: new ObjectId(`${data.id}`) },
      { $set: preparedData },
    )
    return insertedItem
  } catch (err) {
    console.error(`Something went wrong trying to update document: ${err}\n`)
  }
}

async function remove(data) {
  try {
    const query = { _id: new ObjectId(`${data.id}`) }
    const deletedItem = await collection.deleteOne(query)
    return deletedItem
  } catch (err) {
    console.error(`Something went wrong trying to delete the document: ${err}\n`)
  }
}
