//
//
import $ from 'jquery';

// All HTML tinkery goes here
// 
class UI {

    static init(onResize = null, onFocus = null, onUnfocus = null) {
        // capture window resize
        if (onResize !== null) {
            $(window).resize(onResize);
            $(window).on("orientationchange", onResize);
        }
        // capture window focus
        if (onFocus !== null) {
            $(window).on("focus", onFocus);
        }
        if (onUnfocus !== null) {
            $(window).on("blur", onUnfocus);
        }
        // prevent right click
        $(window).on("contextmenu", (e) => {
            e.preventDefault();
            return true;
        });
    }

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