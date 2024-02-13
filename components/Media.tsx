import HlsPlayer from '@/components/HlsPlayer'
import {RedditPost} from '@/lib/types'
import {getMediumImage} from '@/lib/functions'

/**
 * The media component.
 */
export default function Media(post: RedditPost) {
  // Set the medium image asset.
  const mediumImageAsset = getMediumImage(post.preview.images[0].resolutions)

  // Set HLS player defaults.
  const hlsDefaults = {
    autoPlay: false,
    controls: true,
    crossOrigin: 'anonymous',
    loop: true,
    muted: true,
    playsInline: true,
    preload: 'metadata'
  }

  /**
   * Determine the media type and render the appropriate component.
   */
  switch (post.post_hint) {
    /**
     * Image.
     */
    case 'image':
      return (
        <a
          aria-label="view full image"
          href={post.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt={post.title || 'reddit image'}
            data-hint="image"
            decoding="async"
            id={post.id}
            height={mediumImageAsset?.height}
            loading="lazy"
            src={mediumImageAsset?.url}
            width={mediumImageAsset?.width}
          />
        </a>
      )

    /**
     * Hosted video.
     */
    case 'hosted:video':
      return (
        <HlsPlayer
          {...hlsDefaults}
          dataHint="hosted:video"
          height={post.media?.reddit_video?.height}
          id={post.id}
          src={post.video_preview?.hls_url}
          width={post.media?.reddit_video?.width}
        >
          <source
            src={post.media?.reddit_video?.fallback_url}
            type="video/mp4"
          />
        </HlsPlayer>
      )

    /**
     * Rich video.
     *
     * This can either be a video or an iframe.
     */
    case 'rich:video':
      // Iframes are evil. Try to use video preview first.
      return post.preview.reddit_video_preview ? (
        <HlsPlayer
          {...hlsDefaults}
          dataHint="rich:video"
          height={post.preview.reddit_video_preview.height}
          id={post.id}
          src={post.preview.reddit_video_preview.hls_url}
          width={post.preview.reddit_video_preview.width}
        >
          <source
            src={post.preview.reddit_video_preview.fallback_url}
            type="video/mp4"
          />
        </HlsPlayer>
      ) : (
        // Otherwise, fallback to the iframe, but sandbox the heck out of it.
        <div className="w-64">
          <iframe
            allow="fullscreen"
            data-hint="rich:video-iframe"
            id={post.id}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            src={post.secure_media_embed?.media_domain_url}
            style={{
              border: 'none',
              height: '100%',
              width: '100%'
            }}
            title="iframe"
          />
        </div>
      )

    /**
     * Links to Giphy or other gif hosting services.
     *
     * Convert these to MP4s for the HLS player.
     */
    case 'link':
      // If the URL is a gifv...
      return post.url.includes('gifv') ? (
        <HlsPlayer
          {...hlsDefaults}
          dataHint="link:gifv"
          id={post.id}
          poster={mediumImageAsset?.url}
          src={post.video_preview?.hls_url}
        >
          <source src={post.url.replace('.gifv', '.mp4')} type="video/mp4" />
        </HlsPlayer>
      ) : (
        // Otherwise, just play the video.
        <HlsPlayer
          {...hlsDefaults}
          dataHint="link"
          height={post.video_preview?.height}
          id={post.id}
          poster={mediumImageAsset?.url}
          src={post.video_preview?.hls_url}
          width={post.video_preview?.width}
        >
          <source src={post.video_preview?.fallback_url} type="video/mp4" />
        </HlsPlayer>
      )

    /**
     * Nothing matched.
     */
    default:
      return <p>Unsupported or missing media content.</p>
  }
}
