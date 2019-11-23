# YM-Node отслеживание пользователей с помощью Яндекс.Метрики для Node.js

![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101) [![NPM version](https://img.shields.io/npm/v/yametrika.svg)](https://www.npmjs.com/package/@codebyhumans/ym-node) [![Discord](https://img.shields.io/discord/428549781938503681?label=Discord%20chat)](https://discordapp.com/invite/za9tTNp)

## Установка

```
npm i --save @codebyhumans/ym-node
```

Или

```
yarn add @codebyhumans/ym-node
```

## Возможности

- `hit(url, title, ref, params, ut)` посещение страницы
- `goal(target, params)` достижение цели

### Пример

```js
import ym from 'ym-node'

app.get('/404', (req, res) => {
  // Заполнение данных о запросе (уникальность пользователя определяется через user agent & ip)
  ym.req({
    host: req.host,
    userAgent: req.headers['user-agent'],
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
  })

  ym.hit('/404')

  // ...
})
```
