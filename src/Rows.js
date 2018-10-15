import m from 'mithril';
import Row from './Row';

export default class Rows {
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
