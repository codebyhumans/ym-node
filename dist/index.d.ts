interface ISettings {
    id: string | number;
}
interface IRequest {
    userAgent: string;
    referer?: string;
    host: string;
    url?: string;
    ip: string;
}
export default class YMNode {
    private settings;
    private request;
    constructor(settings: ISettings);
    private send;
    private execute;
    private serialize;
    req(req: IRequest): this;
    goal(target: string, params?: object): this;
    hit(url: string, title?: string, ref?: string, params?: object, ut?: string): this;
}
export {};
