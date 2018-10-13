import m from 'mithril';

class JSONFormatter {
    view(vnode) {
        return m(Row, {json: vnode.attrs.json, open: vnode.attrs.open});
    }
}

export default JSONFormatter;

class Row {
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
        if (data !== null && typeof data === 'object') {
            children.push(m('a.toggler-link', [
                m('span.toggler'),
                getKey(key !== undefined ? key : ''),
                m('span.value', [
                    m('span', [
                        m('span.constructor-name', `${Array.isArray(data) ? 'Array' : 'Object'}`),
                        Array.isArray(data) ?
                            m('span', [
                                m('span.bracket', '['),
                                m('span.number', `${data.length}`),
                                m('span.bracket', ']')
                            ]) : null
                    ])
                ])
            ]));
            const className = `.children.object${Array.isArray(data) ? '.array' : ''}`;
            const rows = getRows({json: data, open: vnode.attrs.open - 1});
            this.isOpen ? children.push(m(className), rows) : null;
        } else {
            children.push(m('span', [
                getKey(`${key !== undefined ? key : typeof data}: `),
                m(`span.${data === null ? 'null' : typeof data}`, `${typeof data === 'string' ? `"${data}"` : data}`)
            ]));
        }

        return m(`div.row.dark${this.isOpen ? ' open' : ''}`, {onclick: this.onclick}, children);
    }

    onclick(e) {
        e.stopImmediatePropagation();
        this.isOpen = !this.isOpen;
    }
}

const getKey = key => m('span.key', key);

const getRows = config => {
    const {json, open} = config;
    if (Array.isArray(json)) {
        return json.map((obj, index) => {
            return m(Row, {json: obj, open: open, key: index});
        });
    } else {
        return Object.keys(json).map(key => {
            return m(Row, {json: json[key], open: open, key: key});
        });
    }
};
