import request from "supertest";
import * as config from '../config/config';

describe("GET all USer data /User", () => {
    it("returns status code 200 and all data if present", async () => {
        const res = await request(config.APP_KEY).get("/User");
        expect(res.statusCode).toEqual(200);
        expect(res._body.data.length).toBeGreaterThan(0);
    })
})

describe("GET user data by Id /User/:UserId", () => {
    it("returns status code 400 if no id is sent in params", async () => {
        const res = await request(config.APP_KEY).get("/User/:UserId");
        expect(res.statusCode).toEqual(400);
    });
    it("returns status code 200 and data null if no data found for the given id", async () => {
        const res = await request(config.APP_KEY).get("/User/589a815f53f1eae555f01423");
        expect(res.statusCode).toEqual(200);
        expect(res._body.data).toEqual(null);
    })
    it("returns status code 200 and data null if no data found for the given id", async () => {
        const user = await request(config.APP_KEY).get("/User");
        const userId = user._body.data[0]._id;
        const res = await request(config.APP_KEY).get(`/User/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res._body.data).toBeTruthy();
    })
})

describe("Create User in database", () => {
    it("returns status code 201 and data is create", async () => {
        const res = await request(config.APP_KEY)
            .post("/User")
            .send({
                "name": "Test",
                "address": "testAddress",
                "phone": "testPhone",
                "bloodType": "testbloodType",
                "firstName": "testfirstName",
                "lastName": "testlastName"
            });
        const resId = res._body.data._id;
        expect(res.statusCode).toEqual(201);
        expect(res._body.data).toBeTruthy();
        const deleteRes = await request(config.APP_KEY).delete(`/User/${resId}`)
    });
    it("returns status code 400", async () => {
        const res = await request(config.APP_KEY)
            .post("/User")
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res._body.data).toBeTruthy();
    });
})

describe("Update User in database", () => {
    it("returns status code 400 if no id is sent", async () => {
        const res = await request(config.APP_KEY)
            .patch("/User/:UserId")
            .send({
                "name": "Test",
            });
        expect(res.statusCode).toEqual(400);
    });
    it("returns status code 200 and data equal to null", async () => {
        const res = await request(config.APP_KEY)
            .patch("/User/589a815f53f1eae555f01423")
            .send({ "name": "test1" });
        expect(res.statusCode).toEqual(200);
        expect(res._body.data).toEqual(null);
    });
    it("returns status code 200 and updated data", async () => {
        const User = await request(config.APP_KEY).get("/User");
        const userId = User._body.data[0]._id
        const res = await request(config.APP_KEY)
            .patch(`/User/${userId}`)
            .send({ "name": "test1" });
        expect(res.statusCode).toEqual(200);
        expect(res._body.data.name).toEqual("test1");
    });
})

describe("delete User from database", () => {
    it("returns status code 400 if no id is sent", async () => {
        const res = await request(config.APP_KEY)
            .delete("/User/:UserId");
        expect(res.statusCode).toEqual(400);
    });
    it("returns status code 404", async () => {
        const res = await request(config.APP_KEY)
            .delete("/User/589a815f53f1eae555f01423")
        expect(res.statusCode).toEqual(200);
        expect(res._body.data).toBeFalsy();
    });
    it("returns status code 200", async () => {
        const User = await request(config.APP_KEY)
            .post("/User")
            .send({
                "name": "Test",
                "address": "testAddress",
                "phone": "testPhone",
                "bloodType": "testbloodType",
                "firstName": "testfirstName",
                "lastName": "testlastName"
            })
        const userId = User._body.data._id
        const res = await request(config.APP_KEY)
            .delete(`/User/${userId}`)
        expect(res.statusCode).toEqual(200);
        expect(res._body.data).toEqual(null);
    });
})

describe("GET weather data", () => {
    it("returns status code 200 and no data property if weatherId is not given", async () => {
        const res = await request(config.APP_KEY).get("/Weather/:WeatherId");
        expect(res.statusCode).toEqual(200);
        expect(res._body).not.toHaveProperty("data");
    });
    it("returns status code 200 and data", async () => {
        const res = await request(config.APP_KEY).get("/Weather/201301,IN");
        expect(res.statusCode).toEqual(200);
        expect(res._body.success).toEqual(true);
        expect(res._body.data).toBeTruthy();
    })
})