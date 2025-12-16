/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`
    query GetData {
      allContentfulCaseStudy {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const caseStudies = result.data.allContentfulCaseStudy.edges

  caseStudies.forEach(({ node }) => {
    const caseStudySlug = node.slug
    createPage({
      path: `/${caseStudySlug}`,
      component: require.resolve('./src/templates/case-study-template.js'),
      context: { slug: caseStudySlug },
    })
  })
}
