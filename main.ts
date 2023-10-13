import { Editor, Plugin, MarkdownView } from 'obsidian';

function checkLine(editor: Editor, pattern: RegExp, lineNumber: number, parent: number ) {
    if (pattern.test(editor.getLine(lineNumber))) {
        console.log("There is a task at line: " + lineNumber);
        console.log("This task reads: " + editor.getLine(lineNumber));
        checkLine(editor, pattern, lineNumber + 1, lineNumber)
    }

}


export default class ExamplePlugin extends Plugin {
    async onload() {
      this.addCommand({
        id: "insert-todays-date",
        name: "Insert today's date",
        editorCallback: (editor: Editor) => {
            const cursor = editor.getCursor()
            if (cursor) console.log("got cursor");
            const line = cursor.line;
        },
      });
    
      this.addCommand({
        id: "resize-pinned-tabs",
        name: "Get tasks",
        editorCallback: (editor: Editor) => {
            const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (markdownView) {
                var task_lines = [];
                const task_regex = /^\s+- \[ \]/;
                for (var i=0; i<editor.lastLine()+1; i++) {
                    if (editor.getLine(i).startsWith("- [ ]")) checkLine(editor, task_regex, i +1 , i);
                }
            }
        }

        });
    
    
    }



  }