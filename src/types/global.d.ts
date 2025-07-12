import mongoose from 'mongoose'

declare global {
  var mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }

  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      GITHUB_TOKEN: string
      JWT_SECRET: string
      NODE_ENV: 'development' | 'production' | 'test'
      NEXT_PUBLIC_APP_URL: string
      NEXT_PUBLIC_API_URL: string
    }
  }
}

export {} 