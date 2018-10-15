import m from 'mithril';
import Row from './Row';

export default class Rows {
    view(vnode) {
        const {data} = vnode.attrs;
        if (Array.isArray(data)) {
            return data.map((obj, index) => {
                return m(Row, {...vnode.attrs, data: obj, key: index});
            });
        } else {
            return Object.keys(data).map(key => {
                return m(Row, {...vnode.attrs, data: data[key], key});
            });
        }
    }
}
