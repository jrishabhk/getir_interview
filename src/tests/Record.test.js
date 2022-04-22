const request = require('supertest');
const app = require('../app');

// Test for Route ==> / - GET 
describe('GET Endpoints', () => {
    it('should return Hello Getir in JSON', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toEqual({
            "message": "Hello from Getir"
        });
    })
});


// Test for Route ==> /Record/getRecords - POST
// missing request payload data/fields
describe('POST Record/getRecords', () => {
    it('should return array of messages describing which all parameter are missing and their expected datatype', async () => {
        const res = await request(app).post('/Record/getRecords')
            .send({
                "data" : {

                }
            });
        expect(res.statusCode).toEqual(422);
        expect(res.body.code).toEqual(-1);
        expect(res.body.records).toEqual([]);
    })
});

// success case for getting data
describe('POST Record/getRecords', () => {
    it('should return array of records in date range and whose count sum is in range of min and max count', async () => {
        const res = await request(app).post('/Record/getRecords')
            .send({
                "data" : {
                    "startDate" : "2015-11-28",
                    "endDate" : "2015-11-30",
                    "minCount": 1000 ,
                    "maxCount": 2500
                }
            });
        expect(res.statusCode).toEqual(200);
        // check for code property in reponse
        expect(res.body).toHaveProperty('code');
        expect(res.body.code).toEqual(0);
        // check for message property in reponse
        expect(res.body).toHaveProperty('message');
        expect(res.body.code).toEqual('Success');
        // check for records property in reponse
        expect(res.body).toHaveProperty('records');
        expect(res.body.records).toMatch([
            {
                "key": "hCXxyuAu",
                "createdAt": "2015-11-28T11:47:29.706Z",
                "totalCount": 2085
            },
            {
                "key": "VigaADuH",
                "createdAt": "2015-11-28T03:08:51.966Z",
                "totalCount": 1716
            }
        ]);

    })
});