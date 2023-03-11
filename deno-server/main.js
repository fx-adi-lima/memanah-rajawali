import {serve} from 'https://deno.land/std@0.179.0/http/server.ts';

const handler = async (request) => {
    return new Response("<h1>Hello</h1><p>World!</p>", {
        status: 200,
        headers: {
            "content-type": "text/html"
        }
    });
};

console.log("Will run on port 3000");
await serve(handler, {port: 3000});
