import m from 'mithril';

export default class Key {
    view(vnode) {
        return m('span.key', vnode.attrs.key);
    }
}
