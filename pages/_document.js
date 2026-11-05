import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Libertinus+Serif:wght@400;600&family=Noto+Serif:wght@400;600&display=swap"
                        rel="stylesheet"
                    />
                    {/* apply the family-wide theme cookie before first paint */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(){var d=document.documentElement,fam=/(^|\\.)hovanhoa\\.net$/.test(location.hostname);function apply(){var m=document.cookie.match(/(?:^|; )theme=(dark|light)/);d.classList.toggle('dark',!!m&&m[1]==='dark')}try{if(fam)document.cookie='theme=; path=/; max-age=0';apply();addEventListener('focus',apply);addEventListener('pageshow',apply);document.addEventListener('visibilitychange',function(){if(!document.hidden)apply()});if(window.cookieStore)cookieStore.addEventListener('change',apply)}catch(e){}})()`,
                        }}
                    />
                </Head>
                <body>

                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}