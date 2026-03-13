export default {
    openGraph: {
        type: 'website',
        locale: 'en_US',
        title: 'hovanhoa | info',
        url: 'https://info.hovanhoa.net',
        description: 'Hồ Văn Hòa - Software Engineer | Golang enthusiast. Personal information and links.',
        keywords: 'Hồ Văn Hòa, hovanhoa, software engineer, golang enthusiast, Developer, Blog, Tech Blog, Vietnam Developer, portfolio, personal website, contact',
        images: [
            {
                width: 1200,
                height: 630,
                url: `https://hovanhoa.net/preview.jpg`,
                alt: 'Hồ Văn Hòa',
            },
        ],
        site_name: 'hovanhoa | info',
    },
    twitter: {
        handle: '@_hovanhoa_',
        site: '@_hovanhoa_',
        cardType: 'summary_large_image',
    },
    additionalMetaTags: [
        {
            name: 'author',
            content: 'Hồ Văn Hòa',
        },
        {
            name: 'robots',
            content: 'index, follow',
        },
    ],
    canonical: 'https://info.hovanhoa.net',
};