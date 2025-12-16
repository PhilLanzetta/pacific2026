import { includes, orderBy } from 'lodash'

export class RelatedProjectsFactory {
  // (1.) Create by passing in projects, currentSlug
  constructor(projects, currentProjectSlug) {
    // (2.) Don't include the current project in projects list
    this.projects = projects.filter(
      (aProject) => aProject.slug !== currentProjectSlug
    )

    this.currentProjectSlug = currentProjectSlug
    // (3.) Set default values
    this.maxProjects = 3
    this.tags = []
  }

  // (4.) Builder pattern usage
  setMaxProjects(m) {
    this.maxProjects = m
    return this
  }

  setTags(tagsArray) {
    this.tags = tagsArray
    return this
  }

  getProjects() {
    const { tags, projects, maxProjects } = this
    // (5.) We use an Identity Map to keep track of score
    const identityMap = {}

    if (!!tags === false || tags.length === 0) {
      console.error('RelatedProjectsFactory: Tags not provided, use setTags().')
      return []
    }

    function getSlug(project) {
      return project.slug
    }

    function addToMap(project) {
      const slug = getSlug(project)
      if (!identityMap.hasOwnProperty(slug)) {
        identityMap[slug] = {
          project: project,
          points: 0,
        }
      }
    }

    // (8.) For tags matches, we add 1 point
    function addTagsPoints(project, tags) {
      const tagPoint = 1
      const slug = getSlug(project)

      project.metadata?.tags
        .map((tag) => tag.name)
        .forEach((aTag) => {
          if (includes(tags, aTag)) {
            identityMap[slug].points += tagPoint
          }
        })
    }

    function getIdentityMapAsArray() {
      return Object.keys(identityMap).map((slug) => identityMap[slug])
    }

    // (6.) Map over all projects, add to map and add points
    for (let project of projects) {
      addToMap(project)
      addTagsPoints(project, tags)
    }

    // (9.) Convert the identity map to an array
    const arrayIdentityMap = getIdentityMapAsArray()

    // (10.) Use a lodash utility function to sort them
    // by points, from greatest to least
    const RelatedProjects = orderBy(arrayIdentityMap, ['points'], ['desc'])

    // (11. Take the max number projects requested)
    return RelatedProjects.splice(0, maxProjects)
  }
}
