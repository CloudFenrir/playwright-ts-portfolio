import { test, expect } from '@playwright/test'

test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

type Post = { userId: number, id: number, title: string, body: string };

test('GET /posts/1', async ({ request }) => {
    const response = await request.get('posts/1');

    // validations for both 200s and specific 200
    await expect(response).toBeOK();
    expect(response.status()).toBe(200);

    const postResponse: Post = await response.json();
    expect(postResponse.id).toBe(1);
    expect(postResponse.userId).toBe(1);

})

test('GET /posts?userId=1', async ({ request }) => {
    const response = await request.get('posts?userId=1');

    // validations for both 200s and specific 200
    await expect(response).toBeOK();
    expect(response.status()).toBe(200);

    const postResponse: Post[] = await response.json();
    expect(postResponse.length).toBeGreaterThan(0);
    const wrongPosts = postResponse.filter(post => post.userId !== 1);
    expect(wrongPosts).toEqual([]);

})

test('POST /posts', async ({ request }) => {
    const response = await request.post("/posts", {
        data: { userId: 1, title: "TEST", body: "Test Body" }
    });

    // validations for both 200s and specific 200
    await expect(response).toBeOK();
    expect(response.status()).toBe(201);

    const postResponse: Post = await response.json();
    expect(postResponse.title).toBe("TEST");

})

test('POST /posts/9999', async ({ request }) => {
    const response = await request.get('posts/9999');

    // negative validations
    expect(response.status()).toBe(404);
})