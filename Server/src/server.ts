import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
    const fastify = Fastify({ //Monitora a aplicação, verifica se esta ocorrendo algum problema
        logger: true,
    })

    await fastify.register(cors, {
        origin: true
    })

    fastify.get('/pools/count', async () => {
        const pools = await prisma.pool.count()

        return {pools}
    })

    fastify.get('/users/count', async () => {
        const users = await prisma.user.count()

        return {users}
    })

    fastify.get('/guesses/count', async () => {
        const guesses = await prisma.guess.count()

        return {guesses}
    })

    fastify.post('/pools', async (request, response) => {

        const createPoolBody = z.object({ //Valida o campo para string e não aceita nulo
            title: z.string(),
        })

        const {title} = createPoolBody.parse(request.body)

        const generator = new ShortUniqueId({length: 6}) //Gera um código de 6 caracteres
        const code = String(generator()).toUpperCase()

        await prisma.pool.create({
            data: {
                title: title,
                code: code,
            }
        })

        return response.status(201).send({code})
    })

    await fastify.listen({port: 3333, host: '0.0.0.0'})
}

bootstrap()