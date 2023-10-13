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
function checkLine(editor, pattern, lineNumber, parrent_chain) {
    if (pattern.test(editor.getLine(lineNumber))) {
        parrent_chain.push(lineNumber);
        console.log("There is a task at line: " + lineNumber);
        console.log("This task reads: " + editor.getLine(lineNumber));
        console.log("It's parent is line" + parrent_chain[parrent_chain.length - 1]);
        checkLine(editor, pattern, lineNumber + 1, parrent_chain);
    }
}
class ExamplePlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addCommand({
                id: "resize-pinned-tabs",
                name: "Get tasks",
                editorCallback: (editor) => {
                    const markdownView = this.app.workspace.getActiveViewOfType(obsidian_1.MarkdownView);
                    if (markdownView) {
                        const task_regex = /^\s+- \[ \]/;
                        for (var i = 0; i < editor.lastLine() + 1; i++) {
                            if (editor.getLine(i).startsWith("- [ ]")) {
                                var parent_chain = [i];
                                checkLine(editor, task_regex, i + 1, parent_chain);
                            }
                        }
                    }
                }
            });
        });
    }
}
exports.default = ExamplePlugin;
