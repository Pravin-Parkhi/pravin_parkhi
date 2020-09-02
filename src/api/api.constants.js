
export const apis = {
  baseUrl: 'https://public-api.wordpress.com/rest/v1.1',

  // posts
  getPostList: 'sites/{siteId}/posts/',
  getPostDetails: 'sites/{siteId}/posts/{postId}/',
  getRelatedPostList: 'related-posts/',

  // common
  getBlogCategoryList: 'sites/{siteId}/categories/',
  getBlogTagList: 'sites/{siteId}/tags/'
}
