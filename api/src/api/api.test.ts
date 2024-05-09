import request from 'supertest'
import app from '../app'
import { API_PREFIX } from '../services/constants'

describe(`GET ${API_PREFIX}/healthcheck`, () => {
    it('responds with OK', () => {
        // prettier-ignore
        return request(app)
            .get(`${API_PREFIX}/healthcheck`)
            .expect(200 )
    })
})

describe(`GET ${API_PREFIX}/non-existing-route`, () => {
    it('responds with not found', () => {
        // prettier-ignore
        return request(app)
            .get(`${API_PREFIX}/non-existing-route`)
            .expect(404)
    })
})
