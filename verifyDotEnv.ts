import 'dotenv/config'
import {z} from 'zod'

const dotEnvSchema = z.object({
    NODE_ENV:z.enum(['development','production', 'test']),
    PORT: z.string().default('3000')
})

const dotEnv = dotEnvSchema.parse(process.env) 
//type dotEnvType = z.infer<typeof dotEnvSchema>

export default dotEnv;