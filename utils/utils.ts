const { request } = require('@playwright/test')
require('dotenv').config();


// Custom get request
export const GetResponse = async (endpoint, params) => {
    const context = await request.newContext({
        baseURL: process.env.API_URL
    });
    return await context.get(`/${endpoint}`, { params: params });
}

// Custom post request 
export const PostResponse = async (endpoint, apidata) => {
    const context = await request.newContext({
        baseURL: process.env.API_URL,
    });

    return await context.post(`/${endpoint}`, {
        data: apidata
    });
}

// Custom put request
export const PutResponse = async (endpoint, apidata) => {
    const context = await request.newContext({
        baseURL: process.env.API_URL,
    });

    return await context.put(`/${endpoint}`, {
        data: apidata
    });
}

// Custom put request
export const PatchResponse = async (endpoint, apidata) => {
    const context = await request.newContext({
        baseURL: process.env.API_URL,
    });

    return await context.patch(`/${endpoint}`, {
        data: apidata
    });
}

// Custom delete request
export const DeleteResponse = async (endpoint) => {
    const context = await request.newContext({
        baseURL: process.env.API_URL,
    });

    return await context.delete(`/${endpoint}`);
}