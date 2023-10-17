"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
class Task {
    constructor(line, parent, indent, isDone, children) {
        this.line = line;
        this.parent = parent;
        this.indent = indent;
        this.isDone = isDone;
        this.children = children;
    }
    setDone(editor) {
        console.log("Setting done on line" + this.line);
        editor.setLine(this.line, editor.getLine(this.line).replace(/(\s*)- \[ \]/, "$1- [x]"));
    }
    getChildren(editor, task_regex) {
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
    checkChildren(editor, children) {
        for (const child of children) {
            if (child.isDone == false)
                return -1;
        }
        return 1;
    }
}
class ExamplePlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addCommand({
                id: "get-tasks",
                name: "Get tasks",
                editorCallback: (editor) => {
                    const markdownView = this.app.workspace.getActiveViewOfType(obsidian_1.MarkdownView);
                    if (markdownView) {
                        var tasks;
                        tasks = [];
                        const task_regex = /^\s*- \[( |x)\]/;
                        for (var i = 0; i < editor.lastLine() + 1; i++) {
                            var match = editor.getLine(i).match(task_regex);
                            if (match) {
                                var isDone = match[1] == "x";
                                var task = new Task(i, null, match[0].length, isDone, []);
                                tasks.push(task);
                                task.getChildren(editor, task_regex);
                            }
                        }
                        console.log(tasks);
                        for (const task of tasks) {
                            if (task.children.length != 0) {
                                console.log(task.checkChildren(editor, task.children) + "for task on line " + task.line);
                                if (task.checkChildren(editor, task.children) === 1)
                                    task.setDone(editor);
                            }
                        }
                    }
                }
            });
        });
    }
}
exports.default = ExamplePlugin;
