require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Pacific`,
    description: `Pacific is a New York-based design studio and publisher with a focus on contemporary art and culture. We design books, catalogues, monographs, identities, websites, digital, advertising and print ephemera with galleries, institutions and art-focused organizations.`,
    author: `@pacific_pacific`,
    siteUrl: `https://pacificpacific.pub`,
    keywords: `design, art, culture, books, catalogues, monographs, identities, branding, websites, digital, advertising, print, galleries, institutions, organizations`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pacific`,
        short_name: `pacific`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `gseowxh58tn6`,
        accessToken: process.env.CONTENTFUL_API_KEY,
        enableTags: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-ZSRFB0S9ZM'],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_APP_PASSWORD,
        storeUrl: process.env.GATSBY_MYSHOPIFY_URL,
        downloadImages: true,
        shopifyConnections: ['collections'],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout`),
      },
    },
  ],
}
