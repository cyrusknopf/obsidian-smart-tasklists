import { Editor, Plugin, MarkdownView } from 'obsidian';

export default class ExamplePlugin extends Plugin {
    async onload() {
      this.addCommand({
        id: "insert-todays-date",
        name: "Insert today's date",
        editorCallback: (editor: Editor) => {
            const cursor = editor.getCursor()
            if (cursor) console.log("got cursor");
            const line = cursor.line;

            // while (line > 0) {
            //     const has = editor.processLines(line, "```")
            // }
        },
      });
    
      this.addCommand({
        id: "resize-pinned-tabs",
        name: "Get tasks",
        editorCallback: (editor: Editor) => {
            const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (markdownView) {
                for (var i=0; i<editor.lastLine()+1; i++) {
                    if (editor.getLine(i).startsWith("- [ ]")) {
                        console.log(editor.getLine(i));
                    }
                    else {
                        console.log(editor.getLine(i));
                    }
                }
            }
        }

        });
    
    
    }



  }