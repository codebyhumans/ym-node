"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const querystring_1 = __importDefault(require("querystring"));
class YMNode {
    constructor(settings) {
        this.settings = settings;
        this.settings = settings;
    }
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const path = `/watch/${this.settings.id}/1?rn=${Math.floor(Math.random() * 1e6)}&wmode=2&${querystring_1.default.stringify(data)}`;
                const req = https_1.default.request({
                    method: 'GET',
                    host: 'mc.yandex.ru',
                    port: 443,
                    path,
                    headers: {
                        'x-real-ip': this.request.ip,
                        'user-agent': this.request.userAgent,
                    },
                }, function (res) {
                    if (res.statusCode < 200 || res.statusCode >= 300) {
                        return reject(new Error('statusCode=' + res.statusCode));
                    }
                    res.on('end', resolve);
                });
                req.on('error', (err) => reject(err));
                req.end();
            });
        });
    }
    execute(url, title, ref, params, modes) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            if (url)
                data['page-url'] = url;
            if (ref)
                data['page-ref'] = ref;
            if (params)
                data['site-info'] = JSON.stringify(params);
            if (modes) {
                modes.ar = true;
            }
            else
                modes = { ar: true };
            const browserInfo = ['en:utf-8', `rn:${Math.floor(Math.random() * 1e6)}`];
            for (const key in modes) {
                if (key != 'ut') {
                    browserInfo.push(key + ':' + (modes[key] === true ? '1' : modes[key]));
                }
            }
            if (title)
                browserInfo.push(`t:${title}`);
            data['browser-info'] = browserInfo.join(':');
            if (modes && modes.ut) {
                data.ut = modes.ut;
            }
            this.send(data);
            return this;
        });
    }
    req(req) {
        this.request = req;
        return this;
    }
    goal(target, params) {
        const referer = target ? this.request.url : this.request.referer;
        const url = target
            ? `goal://${this.request.host}/` + target
            : this.request.url;
        this.execute(url, null, referer, params);
        return this;
    }
    hit(url, title, ref, params, ut) {
        this.execute(url || this.request.url, title, ref || this.request.referer, params, { ut });
        return this;
    }
}
exports.default = YMNode;
