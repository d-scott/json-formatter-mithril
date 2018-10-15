import m from 'mithril';
import Row from './Row';

class JSONFormatter {
    view(vnode) {
        return m(Row, vnode.attrs);
    }
}

export default JSONFormatter;
