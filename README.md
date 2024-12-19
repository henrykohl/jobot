# jobot

An AI developed by Jovian using cutting edge ML APIs and models

## 補充 (12/17/2024)

- [Episode 1 - First Contact with Jobot (How to Build an AI: The Chronicles of Jobot)](https://jovian.com/learn/how-to-build-an-ai/lesson/episode-1-first-contact-with-jobot)
  > [Github]()

* 要執行時，將`./backup-files`中的要時執行的 **js**檔複製到 `./jobot-web/pages` 中，並改名為 `index.js`，與 Github 同步後，即可在 [vercel](https://vercel.com/tayuan-hsus-projects/jobot-dev) 執行此專案

* 需要安裝
  > - 安裝 **Tailwind**
  >
  > - 安裝 **Prettier**

- `/backup-files/single.js` 源自 [single-response.js](https://github.com/gopinav/ai/blob/main/examples/javascript-vanilla/single-response.js) 與 [index.html](https://github.com/gopinav/ai/blob/main/examples/javascript-vanilla/index.html)

  > 原本 (在上面 `index.html`)
  >
  > ```html
  > <p id="resultText" class="whitespace-pre-line"></p>
  > ```
  >
  > 改為 (在`/backup-files/single.js`)
  >
  > ```html
  > <div id="resultText" class="whitespace-pre-line">
  >   <div>...</div>
  > </div>
  > ```
  >
  > 原 `<p></p>` tag 改成 `<div></div>` tag，因為在 `<p></p>` tag 中插入 `<div></div>` tag, 就會出現 `React Minified Error #418` in the Inspector 的錯誤(在瀏覽器的開發模式)

- `/backup-files/stream.js` 源自 [stream-response.js](https://github.com/gopinav/ai/blob/main/examples/javascript-vanilla/stream-response.js) 與 [index.html](https://github.com/gopinav/ai/blob/main/examples/javascript-vanilla/index.html)

  > 注意
  >
  > ```javascript
  > const generate = async () => {
  >   ...
  >     /* eslint-disable no-constant-condition (必需加此行，否則會出現Unexpected constant condition)*/
  >     while (true) {
  >       ...
  >     }
  >   ...
  > }
  > ```
  >
  > [`Unexpected constant condition` -- solution](https://stackoverflow.com/questions/63697757/i-get-this-error-unexpected-constant-condition-no-constant-condition-and-cant-fi)

- `/backup-files/stream_output.txt`
  > 儲存了，使用 `/backup-files/stream.js` 運行，輸入 `Hey, how are you today?` 後，decoder.decode(value) 也就是 const chunk 的結果

* `./backup-files/index_stream.js` 執行後沒有結果，原因在於`parser.feed()`根本不會執行
