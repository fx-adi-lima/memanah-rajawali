// buku/src/main.tsx
import React from "https://esm.sh/react@18.1.0";
import * as runtime from "https://esm.sh/react@18.1.0/jsx-runtime";
import { run } from "https://esm.sh/@mdx-js/mdx@2.3.0";
import { renderToString } from "https://esm.sh/react-dom@18.1.0/server";
async function showBook(filename) {
  let docRoot = document.getElementById("root");
  if (docRoot === null || typeof docRoot === "undefined") {
    docRoot = document.createElement("div");
    docRoot.setAttribute("id", "root");
    document.body.appendChild(docRoot);
  }
  const elm = await fetch("/buku/sdyxz/" + filename.toLocaleLowerCase() + ".md").then((x) => x.text()).then(async (y) => {
    const { default: MDXContents } = await run(y, runtime);
    const retval = renderToString(/* @__PURE__ */ React.createElement(MDXContents, null));
    return retval;
  });
  docRoot.innerHTML = elm;
  document.title = "Memanah Burung Rajawali | " + filename.charAt(0).toLocaleUpperCase() + filename.substring(1);
}
window.showBook = showBook;
await showBook("prolog");
export {
  showBook
};
