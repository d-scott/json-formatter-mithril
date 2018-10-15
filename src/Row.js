import m from 'mithril';
import Toggler from './Toggler';
import Key from './Key';
import Rows from './Rows';

export default class Row {
    constructor() {
        this.onclick = this.onclick.bind(this);
        this.isOpen = false;
    }

    oninit(vnode) {
        this.isOpen = vnode.attrs.open > 0;
    }

    view(vnode) {
        const children = [];
        const data = vnode.attrs.json;
        const key = vnode.attrs.key;
        const dataType = typeof data;
        const dataIsArray = Array.isArray(data);
        if (data !== null && dataType === 'object') {
            children.push(m(Toggler, {key, data, config: vnode.attrs.config}));

            if (this.isOpen) {
                const className = `.children.object${dataIsArray ? '.array' : ''}`;
                const rows = m(Rows, {json: data, open: vnode.attrs.open - 1, config: vnode.attrs.config});
                children.push(m(className), rows);
            }
        } else {
            children.push(m('span', [
                m(Key, {key: `${key !== undefined ? key : dataType}: `}),
                m(`span.${data === null ? 'null' : dataType}`, `${dataType === 'string' ? `"${data}"` : data}`)
            ]));
        }

        const theme = vnode.attrs.config.theme;
        return m(`div.row${'.' + theme}${this.isOpen && ' open'}`, {onclick: this.onclick}, children);
    }

    onclick(e) {
        e.stopImmediatePropagation();
        this.isOpen = !this.isOpen;
    }
}