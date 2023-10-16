import { Editor, Plugin, MarkdownView } from 'obsidian';

function checkLineForTasks(editor: Editor, pattern: RegExp, lineNumber: number, parent_chain: Array<number>, indent: number) {
    var line = editor.getLine(lineNumber);
    if (!line) return 0;
    if (!pattern.test(line)) return 0;
    const matches = line.match(pattern);
    if (matches) {
        // console.log("Indent: "+indent);
        // console.log("matches length: " + matches[0].length);
        if (matches[0].length > indent) {
            indent = matches[0].length;
            parent_chain.push(lineNumber-1);

            // console.log  ("There is a task at line: " + lineNumber);
            // console.log("This task reads: " + editor.getLine(lineNumber));
            // console.log("It's parent is line" + parent_chain[parent_chain.length - 1]);
            checkLineForTasks(editor, pattern, lineNumber + 1, parent_chain, indent);
        }
        else if (matches[0].length == indent) {
            parent_chain.push(parent_chain[parent_chain.length - 1]);
            // console.log("There is a task at line: " + lineNumber);
            // console.log("This task reads: " + editor.getLine(lineNumber));
            // console.log("It's parent is line" + parent_chain[parent_chain.length - 1]);
            checkLineForTasks(editor, pattern, lineNumber + 1, parent_chain, indent);
            // console.log(parent_chain);
        }
        else {
            return 0;
        }
    }
}


class Task {
    public line: number;
    public parent: number | null;
    public indent: number;
    public isDone: boolean;
    public children: Array<Task>;

    constructor(line: number, parent:number|null, indent: number, isDone: boolean, children: Array<Task> ) {
        this.line = line;
        this.parent = parent;
        this.indent = indent;
        this.isDone = isDone;
        this.children = children;
    }

    getChildren(editor: Editor) {
        var i = 1;
        while (editor.getLine(this.line + i)) {
            var match = editor.getLine(this.line + i);
            if (match[0].length < this.indent) {
                var isDone = match[1] == "x";
                var child = new Task(this.line + i, this.line, match[0].length, isDone, []);
                child.getChildren(editor);
                this.children.push(child);
            }
        }
        
    }

}

export default class ExamplePlugin extends Plugin {
    async onload() {    
        this.addCommand({
            id: "get-tasks",
            name: "Get tasks",
            editorCallback: (editor: Editor) => {
                const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (markdownView) {
                    var tasks: Array<Task>;
                    tasks = []
                    const task_regex = /^\s*- \[( |x)\]/;
                    for (var i=0; i<editor.lastLine()+1; i++) {
                        var match = editor.getLine(i).match(task_regex);
                        if (match) {
                            var isDone = match[1] == "x";
                            var task = new Task(i, null, match[0].length, isDone, []);
                            tasks.push(task);
                            task.getChildren(editor);

                            console.log(tasks);
                        }
                    }
                }
            }
    
        });  
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    this.addCommand({
        id: "resize-pinned-tabs",
        name: "Get tasks",
        
        editorCallback: (editor: Editor) => {
            const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (markdownView) {
                const task_regex = /^\s*- \[( |x)\]/;
                for (var i=0; i<editor.lastLine()+1; i++) {
                    var match = editor.getLine(i).match(task_regex)
                    if (match) {
                        var parent_chain: number[] = [];
                        // console.log(match[0].length);
                        // console.log("for line" + editor.getLine(i));
                        checkLineForTasks(editor, task_regex, i +1, parent_chain, match[0].length);
                        console.log(parent_chain);
                    }
                }
            }
        }

        });
    }



  }