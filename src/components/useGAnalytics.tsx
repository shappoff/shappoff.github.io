import React from "react";

export const useGAnalytics = (id: string) => {
    React.useEffect(() => {
        if (location.hostname === 'localhost' || ~location.href.indexOf('?debug=true')) {
            const script3 = document.createElement('script');
            script3.innerHTML = `const gtag = function() {};`;
            document.head.appendChild(script3);
            return;
        }

        const script1 = document.createElement('script');
        script1.setAttribute('async', 'true');
        script1.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${id}`);
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${id}');`;
        document.head.appendChild(script2);

        return () => {
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        }
    }, []);
};