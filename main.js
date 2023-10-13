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
class ExamplePlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addCommand({
                id: "insert-todays-date",
                name: "Insert today's date",
                editorCallback: (editor) => {
                    const cursor = editor.getCursor();
                    if (cursor)
                        console.log("got cursor");
                    const line = cursor.line;
                    // while (line > 0) {
                    //     const has = editor.processLines(line, "```")
                    // }
                },
            });
            this.addCommand({
                id: "resize-pinned-tabs",
                name: "Shrink pinned tabs",
                editorCallback: (editor) => {
                    const markdownView = this.app.workspace.getActiveViewOfType(obsidian_1.MarkdownView);
                    if (markdownView) {
                        const leaf = markdownView.leaf;
                        const state = leaf.getViewState();
                        const pinned = state.pinned;
                        console.log(pinned);
                        console.log("hot reload");
                    }
                }
            });
        });
    }
}
exports.default = ExamplePlugin;
