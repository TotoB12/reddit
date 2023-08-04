const config = {
  siteTitle: 'Viewer for Reddit',
  siteDescription: 'Anonymously browse Reddit',
  metaDescription:
    'Anonymously browse images, videos, gifs, and other media from Reddit.',
  siteUrl: 'https://redditviewer.vercel.app/',
  siteAuthor: '@gregrickaby',
  authorUrl: 'https://gregrickaby.com',
  userAgent: 'web-app:viewer-for-reddit:* (by @gregrickaby)',
  githubUrl: 'https://github.com/gregrickaby/viewer-for-reddit',
  redditApi: {
    limit: '24',
    sort: 'hot',
    subReddit: 'itookapicture'
  }
}

export default config
