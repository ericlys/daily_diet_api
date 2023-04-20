import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import NodeEnvironment from 'jest-environment-node'
import { PrismaClient } from '@prisma/client'
import { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment'

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string
  private prisma: PrismaClient

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    this.schema = randomUUID()
    this.prisma = new PrismaClient()
  }

  async setup() {
    const databaseUrl = generateDatabaseUrl(this.schema)
    process.env.DATABASE_URL = databaseUrl
    this.global.process.env.DATABASE_URL = databaseUrl
    execSync('npx prisma migrate deploy')
    return super.setup()
  }

  async teardown() {
    await this.prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`,
    )
    await this.prisma.$disconnect()
  }
}
