import https from 'https'
import querystring from 'querystring'

interface ISettings {
  id: string | number
}

interface IRequest {
  userAgent?: string
  referer?: string
  host: string
  url: string
  ip?: string
}

export default class YMNode {
  private request: IRequest

  constructor(private settings: ISettings) {
    this.settings = settings
  }

  private async send(data: any) {
    return new Promise((resolve, reject) => {
      const path = `/watch/${this.settings.id}/1?rn=${Math.floor(
        Math.random() * 1e6
      )}&wmode=2&${querystring.stringify(data)}`

      const req = https.request(
        {
          method: 'GET',
          host: 'mc.yandex.ru',
          port: 443,
          path,
          headers: {
            'x-real-ip': this.request.ip,
            'user-agent': this.request.userAgent,
          },
        },
        function(res) {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error('statusCode=' + res.statusCode))
          }

          res.on('end', resolve)
        }
      )

      req.on('error', (err) => reject(err))
      req.end()
    })
  }

  private async execute(
    url: string,
    title?: string,
    ref?: string,
    params?: object,
    modes?: {
      [ket: string]: any
    }
  ) {
    const data: any = {}

    if (url) data['page-url'] = url
    if (ref) data['page-ref'] = ref
    if (params) data['site-info'] = JSON.stringify(params)

    if (modes) {
      modes.ar = true
    } else modes = { ar: true }

    const browserInfo = ['en:utf-8', `rn:${Math.floor(Math.random() * 1e6)}`]
    for (const key in modes) {
      if (key != 'ut') {
        browserInfo.push(key + ':' + (modes[key] === true ? '1' : modes[key]))
      }
    }

    if (title) browserInfo.push(`t:${title}`)
    data['browser-info'] = browserInfo.join(':')

    if (modes && modes.ut) {
      data.ut = modes.ut
    }

    this.send(data)

    return this
  }

  public req(req: IRequest) {
    this.request = req
    return this
  }

  public goal(target: string, params?: object) {
    const referer = target ? this.request.url : this.request.referer
    const url = target
      ? `goal://${this.request.host}/` + target
      : this.request.url

    this.execute(url, null, referer, params)
    return this
  }

  public hit(
    url: string,
    title?: string,
    ref?: string,
    params?: object,
    ut?: string
  ) {
    this.execute(
      url || this.request.url,
      title,
      ref || this.request.referer,
      params,
      { ut }
    )

    return this
  }
}
