(() => {
    'use strict';
    kintone.events.on('app.record.create.submit.success', (event) => {
        //   const viewId = 5353404;
        //   if (event.viewId !== viewId) {
        //     return event;
        //   }
        // カスタマイズビューに表示させる内容
        //   const divEl = document.getElementById('customizeview-simple');
        //   const pEl = document.createElement('p');
        //   pEl.textContent = 'Hello World!';
        //   divEl.appendChild(pEl);
        event.url = 'http://cybozu.co.jp/';
        return event;
    });
})();