// Used only by the development fallback when no D1 binding is available.
export function createLocalLikesStore() {
  const posts = new Map<string, Set<string>>();

  function getStatus(postPath: string, visitorHash: string) {
    const visitors = posts.get(postPath);
    return {
      count: visitors?.size ?? 0,
      liked: visitors?.has(visitorHash) ?? false,
      enabled: true,
    };
  }

  function addLike(postPath: string, visitorHash: string) {
    let visitors = posts.get(postPath);
    if (!visitors) {
      visitors = new Set();
      posts.set(postPath, visitors);
    }
    visitors.add(visitorHash);
    return getStatus(postPath, visitorHash);
  }

  function removeLike(postPath: string, visitorHash: string) {
    const visitors = posts.get(postPath);
    visitors?.delete(visitorHash);
    if (visitors?.size === 0) posts.delete(postPath);
    return getStatus(postPath, visitorHash);
  }

  return { getStatus, addLike, removeLike };
}

export const localLikes = createLocalLikesStore();
