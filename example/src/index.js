import m from 'mithril';
import JSONFormatter from '../../src/index';
import json from './giant';

const config = {
    hoverPreviewEnabled: false,
    hoverPreviewArrayCount: 100,
    hoverPreviewFieldCount: 5,
    theme: '',
    animateOpen: true,
    animateClose: true,
    useToJSON: true
};

class Root {
    view() {
        return m('.root', [
            m(`.panel ${config.theme}`, [
                m('.title', 'Giant JSON: '),
                m(JSONFormatter, {data: json, open: 3, config: config})
            ])
        ]);
    }
}

m.mount(document.getElementById('root'), Root);
