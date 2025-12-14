import { queryContent } from "#imports";
import { projectsData } from "~/utils/projectsData";

export interface RelatedPostSummary {
  title: string;
  path: string;
  description?: string;
  date?: string;
  slug: string;
}

export type ProjectWithPosts = (typeof projectsData)[number] & {
  relatedPostsMeta?: RelatedPostSummary[];
};

export const useProjects = async () => {
  const relatedSlugs = Array.from(
    new Set(projectsData.flatMap((project) => project.relatedPosts || []))
  );

  const relatedContent = relatedSlugs.length
    ? await queryContent("blog")
        .where({ _path: { $in: relatedSlugs.map((slug) => `/blog/${slug}`) } })
        .only(["_path", "title", "description", "date"])
        .find()
    : [];

  const relatedPostMap = relatedContent.reduce<Record<string, RelatedPostSummary>>(
    (acc, post) => {
      const slug = post._path.replace(/^\/?blog\//, "");
      acc[slug] = {
        title: post.title,
        path: post._path,
        description: post.description,
        date: post.date,
        slug,
      };
      return acc;
    },
    {}
  );

  const projectsWithPosts: ProjectWithPosts[] = projectsData.map((project) => ({
    ...project,
    relatedPostsMeta: (project.relatedPosts || [])
      .map((slug) => relatedPostMap[slug])
      .filter(Boolean),
  }));

  return {
    projects: projectsWithPosts,
    featuredProjects: projectsWithPosts.filter((project) => project.featured),
    otherProjects: projectsWithPosts.filter((project) => !project.featured),
  };
};
