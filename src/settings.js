//
//

export default class Settings {

    // stores 'obj' in local storages
    static set config(obj) {
        if (window.localStorage !== null) {
            for(const key in obj) {
                this._config[key] = obj[key];
            }
            try {
                localStorage.setItem("config", JSON.stringify(this._config));
            } catch (e) {
            }
        }
    }

    static get config() {
        let res = {};
        if (window.localStorage !== null) {
            let json = null;
            try {
                json = window.localStorage.getItem("config");
            } catch (e) {
            }
            if (json !== null) {
                try {
                    res = JSON.parse(json);
                } catch (e) {
                }
            }
        }
        return res;
    }
}