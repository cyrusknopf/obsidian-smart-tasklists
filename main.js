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
function checkLineForTasks(editor, pattern, lineNumber, parent_chain, indent) {
    var line = editor.getLine(lineNumber);
    if (!line)
        return 0;
    if (!pattern.test(line))
        return 0;
    const matches = line.match(pattern);
    if (matches) {
        // console.log("Indent: "+indent);
        // console.log("matches length: " + matches[0].length);
        if (matches[0].length > indent) {
            indent = matches[0].length;
            parent_chain.push(lineNumber - 1);
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
    constructor(line, parent, indent, isDone, children) {
        this.line = line;
        this.parent = parent;
        this.indent = indent;
        this.isDone = isDone;
        this.children = children;
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
                        const task_regex = /^\s*- \[( |x)\]/;
                        for (var i = 0; i < editor.lastLine() + 1; i++) {
                            var match = editor.getLine(i).match(task_regex);
                            if (match) {
                                var isDone = match[1] == "x";
                                var task = new Task(i, null, match[0].length, isDone, []);
                                console.log(task);
                            }
                        }
                    }
                }
            });
            this.addCommand({
                id: "resize-pinned-tabs",
                name: "Get tasks",
                editorCallback: (editor) => {
                    const markdownView = this.app.workspace.getActiveViewOfType(obsidian_1.MarkdownView);
                    if (markdownView) {
                        const task_regex = /^\s*- \[( |x)\]/;
                        for (var i = 0; i < editor.lastLine() + 1; i++) {
                            var match = editor.getLine(i).match(task_regex);
                            if (match) {
                                var parent_chain = [];
                                // console.log(match[0].length);
                                // console.log("for line" + editor.getLine(i));
                                checkLineForTasks(editor, task_regex, i + 1, parent_chain, match[0].length);
                                console.log(parent_chain);
                            }
                        }
                    }
                }
            });
        });
    }
}
exports.default = ExamplePlugin;
