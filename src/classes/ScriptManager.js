import simpleHash from '../utils/simplehash.js';

export default class ScriptManager {
    constructor() {
        this.head = (document.head || document.documentElement);
        this.scripts = [];
    }
    getPath(src) {
        return chrome.runtime.getURL(src);
    }
    add(src) {
        const ext = src.split('.').pop().toUpperCase();
        const path = this.getPath(src);
        const id = this.id(src, ext);
        const method = `add${ext}`;
        if(method in this) {
            return this[method](path, id).then((script) => {
                this.scripts.push(id);
                return script;
            });
        } else {
            return Promise.reject('Unknown file type');
        }
    }
    remove(src) {
        const id = this.id(src);
        const script = document.getElementById(id);
        if (script) {
            this.head.removeChild(script);
        }
        const index = this.scripts.indexOf(script);
        if (index > -1) {
            this.scripts.splice(index, 1);
        }
    }
    addJS(src, id) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.id = id;
            script.onload = () => resolve(script);
            this.head.appendChild(script);
        });
    }
    addCSS(href,id) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.href = href;
            link.id = id;
            link.type = 'text/css';
            link.rel ='stylesheet';
            link.onload = () => resolve(link);
            this.head.appendChild(link);
        });
    }
    id(src, type) {
        return `${type}-${simpleHash(src)}`;
    } 
}