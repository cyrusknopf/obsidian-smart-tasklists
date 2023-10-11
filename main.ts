import { Editor, Plugin, MarkdownView, WorkspaceLeaf } from 'obsidian';

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
        name: "Shrink pinned tabs",
        editorCallback: (editor: Editor) => {
            const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (markdownView) {
                const leaf = markdownView.leaf;
                if (leaf) {
                    leaf.togglePinned;
                }
            }
        }

        });
    
    
    }



  }