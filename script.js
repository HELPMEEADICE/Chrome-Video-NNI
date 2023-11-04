// ==UserScript==
// @name         解决Chrome视频模糊
// @namespace    https://www.cccpserver.cf/
// @version      2.1
// @description  将Chrome令人糟糕的视频缩放算法改为最邻近插值算法
// @author       HELPMEEADICE
// @license GPLv3
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function applyFilterToVideos() {
        var videos = document.querySelectorAll('video');
        videos.forEach(function(video) {
            video.style.filter = 'contrast(1)';
        });
    }

    // 初始应用滤镜
    applyFilterToVideos();

    // 使用 MutationObserver 监视文档变化，以便在新的视频元素被添加到页面时应用滤镜
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                applyFilterToVideos();
            }
        });
    });

    // 配置 MutationObserver 监视整个文档以及子节点的变化
    var observerConfig = {
        childList: true,
        subtree: true
    };

    // 启动 MutationObserver
    observer.observe(document.body, observerConfig);
})();
