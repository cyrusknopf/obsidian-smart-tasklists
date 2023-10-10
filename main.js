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
class MyPlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addCommand({
                id: 'access-codemirror-instance',
                name: 'Access CodeMirror Instance',
                callback: this.accessCodeMirror.bind(this),
            });
        });
    }
    accessCodeMirror() {
        const mkdview = this.app.workspace.getActiveViewOfType(obsidian_1.MarkdownView);
        if (!mkdview) {
            console.log('No active Markdown view found.');
            return;
        }
        const editor = mkdview.editor;
        if (!editor) {
            console.log('No editor found for the active view.');
            return;
        }
        const cm = editor.cm;
        if (cm) {
            console.log('Successfully accessed the CodeMirror instance.');
            // You can now use the cm variable to interact with CodeMirror directly.
        }
        else {
            console.log('Failed to access the CodeMirror instance.');
        }
    }
}
exports.default = MyPlugin;
