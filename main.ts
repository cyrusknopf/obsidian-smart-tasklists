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
        name: "Shrink pinned tabs",
        editorCallback: (editor: Editor) => {
            const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (markdownView) {
                const leaf = markdownView.leaf;
                const state = leaf.getViewState();
                const pinned = state.pinned;
                console.log(pinned);
                const title = markdownView.file?.basename;

                const tabElement = Array.from(document.querySelectorAll('.workspace-tab')).find(tab => {
                    const tabTitle = tab.textContent?.trim();
                    return tabTitle === title;
                }) as HTMLElement;

                if (tabElement) {
                    // Apply your desired styles
                    tabElement.style.backgroundColor = "red";
                }
                else console.log("fail");

            }
        }

        });
    
    
    }



  }