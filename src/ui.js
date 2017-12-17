//
//
import $ from 'jquery';

class UI {
    static show(what) {
        $(what).css({
            display: 'block'
        });
    }

    static hide(what) {
        $(what).css({
            display: 'none'
        });
    }

    static html(elem, text) {
        $(elem).html(text);
    }
}

export default UI;