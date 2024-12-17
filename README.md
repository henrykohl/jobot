# jobot

An AI developed by Jovian using cutting edge ML APIs and models

## 補充 (12/17/2024)

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
