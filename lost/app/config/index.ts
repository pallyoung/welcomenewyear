import { UserAgent } from 'native'
import qa from './qa'
import dev from './dev'
import prod from './prod'

export enum Environment {
  dev = 'dev',
  qa = 'qa',
  prod = 'prod'
}
export interface URI {
  protocol: string,
  domain: string,
}
export interface ApplicationConfig {
  env: string,
  publicApiURI: URI
}

const defaultConfig: ApplicationConfig = {
  env: Environment.dev,
  publicApiURI: {
    protocol: '',
    domain: ''
  }
}
const ENV_CONFIG:any = {
  qa,
  dev,
  prod
}
let config: ApplicationConfig = Object.assign({}, defaultConfig, ENV_CONFIG[UserAgent.ENV])
export default config;