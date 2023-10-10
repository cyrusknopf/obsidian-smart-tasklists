import { Plugin, MarkdownView } from 'obsidian';

export default class MyPlugin extends Plugin {
    async onload() {
        this.addCommand({
            id: 'access-codemirror-instance',
            name: 'Access CodeMirror Instance',
            callback: this.accessCodeMirror.bind(this),
        });
    }

    accessCodeMirror() {
        const mkdview = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!mkdview) {
            console.log('No active Markdown view found.');
            return;
        }

        const editor = mkdview.editor;
        if (!editor) {
            console.log('No editor found for the active view.');
            return;
        }

        const cm = (editor as any).cm;
        if (cm) {
            console.log('Successfully accessed the CodeMirror instance.');
            // You can now use the cm variable to interact with CodeMirror directly.
        } else {
            console.log('Failed to access the CodeMirror instance.');
        }
    }

    // ... rest of your plugin code ...
}
