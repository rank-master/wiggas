
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.0bc8e3aa7efc57828e89.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/6797.latest.en.ad0ee70b06bc9854ca6b.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5817.latest.en.5b8f3a488f62c86e1062.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5816.latest.en.62966691cce79d1ce69d.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.33b22aba5581a8912bef.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4100.latest.en.8e7cc044415897fd13ea.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/3147.latest.en.5cb97deead945b5bc3b3.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/794.latest.en.f8a7f2bbf7aef3e0f8bf.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4328.latest.en.94a870c5afb880738b13.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/648.latest.en.f31f31ea19195adc3da4.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5455.latest.en.96c22752ba6f7bfb918b.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/8024.latest.en.06d436106f4515657027.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/8217.latest.en.b3bf2852be394153030e.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.66c1b4069041a68a5d23.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/6797.latest.en.4d537816ff9556bf1225.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.8bb004feb2aa35e02d5d.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.21b3378cad51e984f146.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0816/1814/1505/files/Realitees_logo_x320.png?v=1692862557"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  