import { Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {
    async onload() {
        console.log('loading smart-tasklists');
        // Code
    }

    onunload() {
        console.log('unloading smart-tasklists');
        // Clean up, if necessary.
    }
}
