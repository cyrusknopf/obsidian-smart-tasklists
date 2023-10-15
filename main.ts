import { Editor, Plugin, MarkdownView } from 'obsidian';

function checkLineForTasks(editor: Editor, pattern: RegExp, lineNumber: number, parent_chain: Array<number>, indent: number) {
    var line = editor.getLine(lineNumber);
    if (!line) return 0;
    if (!pattern.test(line)) return 0;
    const matches = line.match(pattern);
    if (matches) {
        if (matches[0].length > indent) {
            indent = matches[0].length;
            parent_chain.push(lineNumber-1);

            console.log("There is a task at line: " + lineNumber);
            console.log("This task reads: " + editor.getLine(lineNumber));
            console.log("It's parent is line" + parent_chain[parent_chain.length - 1]);
            checkLineForTasks(editor, pattern, lineNumber + 1, parent_chain, indent);
        }
        else if (matches[0].length == indent) {
            parent_chain.push(parent_chain[parent_chain.length - 1]);
            console.log("There is a task at line: " + lineNumber);
            console.log("This task reads: " + editor.getLine(lineNumber));
            console.log("It's parent is line" + parent_chain[parent_chain.length - 1]);
            checkLineForTasks(editor, pattern, lineNumber + 1, parent_chain, indent);
        }
        else {
            return 0;
        }
    }
}

// function checkChildTasks(editor: Editor, pattern: RegExp, parent_chain: Array<number>) {
//         for (var i=parent_chain.length -1 ; i > 0; i--) {
//             const match = editor.getLine(i).match(pattern);
//             if (match) {
//                 if (!(match[1]==="x")) {
//                     break;
//                 }

//             }
//         }
// }


export default class ExamplePlugin extends Plugin {
    async onload() {    
      this.addCommand({
        id: "resize-pinned-tabs",
        name: "Get tasks",
        
        editorCallback: (editor: Editor) => {
            const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (markdownView) {
                const task_regex = /^\s+- \[ (?x?) \]/;
                for (var i=0; i<editor.lastLine()+1; i++) {
                    var match = editor.getLine(i).match(task_regex)
                    if (match) {
                        var parent_chain: number[] = [];
                        checkLineForTasks(editor, task_regex, i +1, parent_chain, match[0].length);
                    }
                }
            }
        }

        });
    }



  }