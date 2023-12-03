import { expect } from 'chai';
import { test, teardown } from 'tap';
import { faker } from '@faker-js/faker';
import app from '../src/app.js';

// Fucntion to close the Fastify server
teardown(() => app.close());

// Test case for '/hello' route
test('Request the /hello route', async () => {
    const res = await app.inject({
        method: 'GET',
        url: '/hello',
    });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.equal('Hello World'); 
});

// Test case for list all users from '/dbTest'
test('List all users from /dbTest', async () => {
    const res = await app.inject({
        method: 'GET',
        url: '/dbTest',
    });

    expect(res.statusCode).to.equal(200); 
    
});

// Test case for Creating a new user
test('Creating a new user', async () => {
    const payload = {
        name: 'testname',
        email: faker.internet.email(),
    };

    const res = await app.inject({
        method: 'POST',
        url: '/users',
        payload,
    });

    expect(res.statusCode).to.equal(201); 
    const resPayload = JSON.parse(res.payload);
    expect(resPayload.email).to.equal(payload.email); 
});
