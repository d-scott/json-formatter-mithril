import m from 'mithril';

class JSONFormatter {
    view(vnode) {
        const {json, open, config} = vnode.attrs;
        return m(Row, {json, open, config});
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
        const dataType = typeof data;
        const dataIsArray = Array.isArray(data);
        if (data !== null && dataType === 'object') {
            children.push(m(Toggler, {key, data}));

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

class Toggler {
    view(vnode) {
        const key = vnode.attrs.key;
        const data = vnode.attrs.data;
        const dataIsArray = Array.isArray(data);
        return m('a.toggler-link', [
            m('span.toggler'),
            m(Key, {key}),
            m('span.value', [
                m('span', [
                    m('span.constructor-name', `${dataIsArray ? 'Array' : 'Object'}`),
                    dataIsArray ?
                        m('span', [
                            m('span.bracket', '['),
                            m('span.number', `${data.length}`),
                            m('span.bracket', ']')
                        ]) : null
                ])
            ])
        ]);
    }
}

class Key {
    view(vnode) {
        return m('span.key', vnode.attrs.key);
    }
}

class Rows {
    view(vnode) {
        const {json, open, config} = vnode.attrs;
        if (Array.isArray(json)) {
            return json.map((obj, index) => {
                return m(Row, {json: obj, key: index, open, config});
            });
        } else {
            return Object.keys(json).map(key => {
                return m(Row, {json: json[key], open, key, config});
            });
        }
    }
}
