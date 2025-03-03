import { test, expect } from '@playwright/test';
import requestData from "../../test-data/request-data.json";
import responseData from "../../test-data/response-data.json";
import { 
    GetResponse, PostResponse, PutResponse, 
    PatchResponse, DeleteResponse} from "../../utils/utils";

//Get request that returns list of users
test('Get a list of users!', async() => {
    // Setting up the query params
    const params = new URLSearchParams();
    params.set('page', '2');

    // Keeping the response from the http request in a const
    const response = await GetResponse('api/users', params);

    // Validating the response status code
    expect(response.status()).toBe(200)

    // Validating the response body data, list of users
    const respJson = await response.json();
    expect(respJson.total).toBe(responseData.users.length)

    // Validating the response body data
    for(var user of respJson.data) {
        expect(responseData.users).toContainEqual(user)
    }
})

// Post request that performs successful login
test('Successful login', async() => {
    // Keeping the response from the http request in a const
    const response = await PostResponse('api/login', requestData.successful_login);

    // Validating the response status code
    expect(response.status()).toBe(200);

    // Validating the response body 
    const respJson = await response.json();
    expect(respJson.token).toBeTruthy();
})

// Put request that performs an update
test('Update an existing user', async() => {
    // Keeping the response from the http request in a const
    const response = await PutResponse('api/users/2', requestData.update_existing_user);

    // Validating the response status code
    expect(response.status()).toBe(200);

     // Validating the response body 
    const respJson = await response.json();
    expect(respJson.name).toEqual(requestData.update_existing_user.name)
})

// Patch request that performs an update
test('Update Patch an existing user', async() => {
    // Keeping the response from the http request in a const
    const response = await PatchResponse('api/users/2', requestData.patch_existing_user);

    // Validating the response status code
    expect(response.status()).toBe(200)

    // Validating the response body 
    const respJson = await response.json();
    expect(respJson.job).toEqual(requestData.patch_existing_user.job)
})

// Delete request that performs deletion
test('Delete an existing user', async() => {
    // Keeping the response from the http request in a const
    const response = await DeleteResponse('api/users/2');

    // Validating the response status code
    expect(response.status()).toBe(204)
})

// Negative scenarios

// Post request that performs unsuccessful login
test('Unsuccessful login', async() => {
    // Keeping the response from the http request in a const
    const response = await PostResponse('api/login', requestData.unsuccessful_login);

    // Validating the response status code
    expect(response.status()).toBe(400)

    // Validating the response body 
    const respJson = await response.json();
    expect(respJson.error).toEqual(responseData.unsuccessful_login.error)
})

// Get request that performs not found resource
test('Single resource not found', async() => {
    // Keeping the response from the http request in a const
    const response = await GetResponse('api/unknown/23', null);

    // Validating the response status code
    expect(response.status()).toBe(404)

    // Validating that the response body is empty
    expect(await response.json()).toStrictEqual({})
})

// Get request that performs delayed response
test('Delayed response!', async() => {
    // Setting up the query params
    const params = new URLSearchParams();
    params.set('delay', '3');
   
    // Keeping the current time in a const before the request start
    const requestDate = new Date().getTime();
    // Keeping the response in a const
    const response = await GetResponse('api/users', params);

    // Keeping the current time in a const after the request end
    const responseDate = new Date().getTime();
    
    // Validating the response status code
    expect(response.status()).toBe(200)
    
    // Validating the duration of the request
    const duration = ((responseDate - requestDate)/1000)%60;
    expect(duration).toBeGreaterThan(3);
    
    // Validating the response body data 
    const respJson = await response.json();
    for(var user of respJson.data) {
        expect(responseData.users).toContainEqual(user)
    }
})