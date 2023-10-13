import { Editor, Plugin, MarkdownView } from 'obsidian';

function checkLine(editor: Editor, pattern: RegExp, lineNumber: number, parent_chain: Array<number>, indent: number) {
    var line = editor.getLine(lineNumber);
    if (!line) return -1;
    if (!pattern.test(line)) return -1;
    const matches = line.match(pattern);
    if (matches) {
        if (matches[0].length > indent) {
            indent = matches[0].length;
            parent_chain.push(lineNumber-1);
            console.log("There is a task at line: " + lineNumber);
            console.log("This task reads: " + editor.getLine(lineNumber));
            console.log("It's parent is line" + parent_chain[parent_chain.length - 1])
            checkLine(editor, pattern, lineNumber + 1, parent_chain, indent)
        }
        else {
            return null;
        }
    }
}


export default class ExamplePlugin extends Plugin {
    async onload() {    
      this.addCommand({
        id: "resize-pinned-tabs",
        name: "Get tasks",
        
        editorCallback: (editor: Editor) => {
            const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (markdownView) {
                const task_regex = /^\s+- \[ \]/;
                for (var i=0; i<editor.lastLine()+1; i++) {
                    if (editor.getLine(i).startsWith("- [ ]")) {
                        var parent_chain: number[] = [i];
                        checkLine(editor, task_regex, i +1, parent_chain, 0);
                
                    }
                }
            }
        }

        });
    }



  }