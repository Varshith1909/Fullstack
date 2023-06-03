import 'chai/register-should.js';

import {test, teardown} from "tap";
import {faker} from "@faker-js/faker";
import app from "../src/app.js";

teardown(() => app.close());

test("Rerquest the /hello route", async() => {
  const res = await app.inject({
	method:'GET',
	url:'/hello'
  });
  
  res.statusCode.should.equals(200);
  res.body.should.equal("Hello");
});

test("List all users from /dbTest", async() => {
  const res = await app.inject({
	method:'GET',
	url:'/dbTest'
  });
  
  res.statusCode.should.equals(200);
});

test("Cerating a new user", async() => {
  const payload = {
	name: "testname",
	email: faker.internet.email()
  };
  
  const res = await app.inject({
	method:'POST',
	url:'/users',
	payload
  });
  
  res.statusCode.should.equal(200);
  res.payload.should.not.equal(payload);
  const resPayload = res.json();
  resPayload.email.should.equal(payload.email);
});
