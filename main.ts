import { Editor, Plugin, MarkdownView } from 'obsidian';
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


    setDone(editor: Editor) {
        editor.setLine(this.line, editor.getLine(this.line).replace(/(\s*)- \[ \]/, "$1- [x]"));
    }


    getChildren(editor: Editor, task_regex: RegExp) {
        var i = 1;
        while (editor.getLine(this.line + i).match(task_regex)) {
            var match = editor.getLine(this.line + i).match(task_regex);
            if (match) {
                if (match[0].length > this.indent) {
                    var isDone = match[1] == "x";
                    var child = new Task(this.line + i, this.line, match[0].length, isDone, []);
                    child.getChildren(editor, task_regex);
                    this.children.push(child);
                }
                else {
                    break;
                }
            }
                
            i = i + 1;
        
        }
    }


    checkChildren(editor: Editor, children: Array<Task>) {
        for (const child of children) {
            if (child.isDone == false) return -1;
        }
        return 1;
    }

}

export default class ExamplePlugin extends Plugin {
    async onload() {    
        this.app.vault.on('modify', this.updateTasks.bind(this))
    }

    async onunload() {
        this.app.vault.off('modify', this.updateTasks.bind(this));
    }

    updateTasks() {
        console.log("Updating tasks...");
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView) {
            const editor = markdownView.editor;
            var tasks: Array<Task>;
            tasks = []
            const task_regex = /^\s*- \[( |x)\]/;
            for (var i=0; i<editor.lastLine()+1; i++) {
                var match = editor.getLine(i).match(task_regex);
                if (match) {
                    var isDone = match[1] == "x";
                    var task = new Task(i, null, match[0].length, isDone, []);
                    tasks.push(task);
                    task.getChildren(editor, task_regex);
                }
            }
            for (const task of tasks) {
                if (task.children.length != 0) {
                    if (task.checkChildren(editor, task.children) === 1) task.setDone(editor);
                }
            }
        }
    }
}