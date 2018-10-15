import m from 'mithril';
import Key from './Key';

export default class Toggler {
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
            ]),
            this.getPreview(vnode.attrs.config, data, dataIsArray)
        ]);
    }

    getPreview(config, data, dataIsArray) {
        if (config) {
            let contents;
            if (dataIsArray) {
                contents = `[${data.map((value, index) => index)}]`;
            } else {
                contents = `{${Object.keys(data).map(key => `"${key}":"${data[key]}"`)}}`;
            }
            return m('span.preview-text', contents);
        }

        return null;
    }
}
