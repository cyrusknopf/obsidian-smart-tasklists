import { Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {
    async onload() {
        console.log('loading plugin');
        // Your code here.
    }

    onunload() {
        console.log('unloading plugin');
        // Clean up, if necessary.
    }
}
