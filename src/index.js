import m from 'mithril';
import Row from './Row';

class JSONFormatter {
    view(vnode) {
        const {json, open, config} = vnode.attrs;
        return m(Row, {json, open, config});
    }
}

export default JSONFormatter;
