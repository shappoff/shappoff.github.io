import Script from 'next/script';

const GA_ID = 'G-BS71TCVL7J';

export default function GAAnalytics() {
  if (process.env.DEBUG) {
    return null;
  }

  return (
    <Script id="ga-loader" strategy="lazyOnload">
      {`
        if (location.href.indexOf('debug') !== -1) {
          localStorage.setItem('debug', 'true');
        } else if (!localStorage.getItem('debug')) {
          var s = document.createElement('script');
          s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
          s.async = true;
          document.head.appendChild(s);
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        }
      `}
    </Script>
  );
}
