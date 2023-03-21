import {serve} from 'https://deno.land/std@0.179.0/http/server.ts';
import { compile, run } from "https://esm.sh/@mdx-js/mdx@2.3.0";
import * as CompileOptions from 'https://esm.sh/@mdx-js/mdx@2.3.0/index.d.ts';
import React from 'https://esm.sh/react@18.1.0';
import {renderToString} from 'https://esm.sh/react-dom@18.1.0/server';
import * as runtime from 'https://esm.sh/react@18.1.0/jsx-runtime';
import remarkGfm from 'https://esm.sh/remark-gfm';
import rehypeHighlight from 'https://esm.sh/rehype-highlight';

async function home(request: Request): Promise<Response> {
    const pathname = (new URL(request.url)).pathname;
    console.log("[request]: " + pathname);
    if (pathname.endsWith("favicon.ico")) {
        // give the icon
        const img = await Deno.readFile("./favicon.ico");
        return new Response(img, {
            status: 200,
            headers: { "content-type": "image/icon" }
        });
    }
    else if (pathname.endsWith(".html")) {
        const h = await Deno.readTextFile("." + pathname);
        return new Response(h, {
            status: 200,
            headers: { "content-type": "text/html" }
        });
    }
    else if (pathname.endsWith(".js")) {
        const h = await Deno.readTextFile("." + pathname);
        return new Response(h, {
            status: 200,
            headers: { "content-type": "text/javascript" }
        });
    }
    else if (pathname.endsWith(".css")) {
        const h = await Deno.readTextFile("." + pathname);
        return new Response(h, {
            status: 200,
            headers: { "content-type": "text/css" }
        });
    }
    else if (pathname.endsWith(".mdx")) {
        const h = await Deno.readTextFile("." + pathname);
        const codes = await compile(h, {
            outputFormat: 'function-body',
            rehypePlugins: [rehypeHighlight],
            remarkPlugins: [remarkGfm]    
        });
        return new Response(String(codes), {
            status: 200,
            headers: { "content-type": "text/javascript" }
        });
    }
    else if (pathname.endsWith(".md")) {
        const h = await Deno.readTextFile("." + pathname);
        const codes = await compile(h, {
            outputFormat: 'function-body',
            rehypePlugins: [rehypeHighlight],
            remarkPlugins: [remarkGfm]    
        });
        return new Response(String(codes), {
            status: 200,
            headers: { "content-type": "text/javascript" }
        });
    }

    const strText = await Deno.readTextFile('./docs/home.mdx');
    const code = await compile(strText, {
        outputFormat: 'function-body',
        rehypePlugins: [rehypeHighlight],
        remarkPlugins: [remarkGfm]
    });
    const {default: Contents} = await run(String(code), runtime);
    const html = await renderToString(Contents());
    const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Belajar Typescript</title>
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/xcode.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body, h1, h2, h3, h4, h5, h6 {
    font-family: 'Segoe UI', Verdana, Tahoma, Helvetica;
}
a { text-decoration: none; color: royalblue; }
code {
    font-family: 'Consolas', monospace, Monospace, Monaco;
}
</style>
</head>
<body>
<main class="w3-main w3-container" id="main">
<div class="w3-content" id="root">${html}</div>
</main>
</body>
</html>`;
    return new Response(page, {
        status: 200,
        headers: {
            "content-type": "text/html"
        }
    });
}

await serve(home, {port: 3000});
