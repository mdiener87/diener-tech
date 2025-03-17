// These composables are auto-imported by Nuxt, no manual import needed

/**
 * Composable for handling SEO metadata across the site
 */
export const useSeo = () => {
  /**
   * Set page metadata including SEO and Open Graph tags
   */
  const setPageMeta = (options: {
    title: string,
    description: string,
    image?: string,
    type?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_status' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other',
    publishedTime?: string,
    modifiedTime?: string,
    tags?: string[],
    canonicalUrl?: string
  }) => {
    const {
      title,
      description,
      image = '/images/default-social.jpg', // Default image
      type = 'website',
      publishedTime,
      modifiedTime,
      tags,
      canonicalUrl
    } = options;

    const siteName = 'DienerTech';
    const siteUrl = 'https://diener.tech';
    const fullTitle = `${title} | ${siteName}`;
    const fullUrl = canonicalUrl || `${siteUrl}${useRoute().path}`;

    // Basic metadata
    useHead({
      title: title,
      titleTemplate: `%s | ${siteName}`,
      meta: [
        { name: 'description', content: description },
        { name: 'author', content: 'Michael Diener' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'canonical', href: fullUrl },
      ]
    });

    // Extended SEO metadata with Open Graph and Twitter tags
    useSeoMeta({
      title: fullTitle,
      description: description,
      
      // Open Graph
      ogTitle: fullTitle,
      ogDescription: description,
      ogImage: image,
      ogType: type,
      ogUrl: fullUrl,
      ogSiteName: siteName,
      
      // Twitter
      twitterTitle: fullTitle,
      twitterDescription: description,
      twitterImage: image,
      twitterCard: 'summary_large_image',
      
      // Article specific data (for blog posts)
      ...(publishedTime && { articlePublishedTime: publishedTime }),
      ...(modifiedTime && { articleModifiedTime: modifiedTime }),
      ...(tags?.length && { articleTag: tags }),
    });
  };

  return {
    setPageMeta,
  };
}; 