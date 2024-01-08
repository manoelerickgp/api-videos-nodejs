import { fastify } from 'fastify'

//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//const database = new DatabaseMemory()

const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {

    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async () => {
    const videos = await database.list()
    
    return videos
})

server.get('/findVideoByQuery', (request) => {
    const search = request.query

    const videos = database.list(search)

    return videos
})

server.get('/videoById/:id', async (request) => {
    const videoId = request.params.id

    const video = await database.findById(videoId)

    return video
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})