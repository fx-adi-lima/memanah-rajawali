
function doMsg() {
    Personal.showToast("main.js started");
}


function previewDat(a) {
    let html = marked.parse(editor.getValue(), {
        gfm:true,
        highlight: function(code, lang, cb) {
            let res = hljs.highlight(code, {language: lang}).value;
            if (cb) {
                cb(null, res);
            }
            return res;
        }
    });
    document.getElementById("preview").innerHTML = html;
}

async function openLocal() {
    const options = {
        types: [
            {
                description: "All Markdown files",
                accept: {
                    'text/markdown': [ '.md' ]
                }
            },
            {
                description: "Plain text files",
                accept: {
                    'text/plain': [ '.txt' ]
                }
            }
        ],
        excludeAcceptAllOptions: true,
        multiple: false
    };

    let filehandle;
    [filehandle] = await window.showOpenFilePicker(options);
    await filehandle.getFile()
        .then((response) => response.text())
        .then((txt) => editor.setValue(txt));
}

async function saveLocal() {
    const options = {
        types: [
            {
                description: 'All Markdown Files',
                accept: {
                    'text/markdown': ['.md'],
                },
            },
        ],
    };
    
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(editor.getValue());
    // Close the file and write the contents to disk.
    await writable.close();
}

function doMarkdown() {
    let str1 = Personal.loadMarkdown("intro.md");
    let html = marked.parse(str1, {
	gfm: true
    });
    document.getElementById('preview').innerHTML = html;
}

/*

ClassicEditor.create(document.getElementById('editor'))
.catch( error => {
    Personal.showToast("Error creating the editor");
});

var editor = ace.edit("editor", {
    mode: 'ace/mode/markdown',
    theme: 'ace/theme/github'
});

editor.setValue("This is a test");

*/



