import { fastify } from 'fastify'

//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//const database = new DatabaseMemory()

const databse = new DatabasePostgres()

server.post('/videos', (request, reply) => {

    const { title, description, duration } = request.body

    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', () => {
    const videos = database.list()
    
    return videos
})

server.get('/videos', (request) => {
    const search = request.query

    const videos = database.list(seach)
})

server.get('/videoById/:id', (request, reply) => {
    const videoId = request.params.id

    const video = database.findById(videoId)

    return video
})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)
    return reply.status(204).send()
})

server.listen({
    port: 3333,
})