import {Server} from '../server'
import request from 'supertest';
import { StudentController } from "./student.controller";



jest.setTimeout(10000)
let server: any

beforeAll(async () => {
    const svr = new Server();
    await svr.routes();
    server = svr.App;
})

describe("GET /api/v1/students", () => {
    
    it("should return 200 & valid response if request param list is empty array", done => {
        request(server)
            .get(`/api/v1/students`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.statusCode).toEqual('success')
                done()
            })
    });

    it("it should return 400 & valid error response if query param is empty", done => {
        request(server)
            .post(`/api/v1/students`)
            .send({
                "firstName":"aada"
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({
                    'errors': expect.anything()
                })
                done()
            })
    })

})

