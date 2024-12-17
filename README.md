# jobot

An AI developed by Jovian using cutting edge ML APIs and models

## 補充 (12/17/2024)

- `/backup-files/single.js` 源自 [single-response.js](https://github.com/gopinav/ai/blob/main/examples/javascript-vanilla/single-response.js) 與 [index.html](https://github.com/gopinav/ai/blob/main/examples/javascript-vanilla/index.html)
  > 原本
  >
  > ```html
  > <p id="resultText" class="whitespace-pre-line"></p>
  > ```
  >
  > 改為
  >
  > ```html
  > <div id="resultText" class="whitespace-pre-line">
  >   <div>...</div>
  > </div>
  > ```
  >
  > 原 `<p></p>` tag 改成 `<div></div>` tag，因為在 `<p></p>` tag 中插入 `<div></div>` tag, 就會出現 `React Minified Error #418` in the Inspector 的錯誤(在瀏覽器的開發模式)
