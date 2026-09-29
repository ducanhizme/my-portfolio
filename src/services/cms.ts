import { projects as staticProjects } from '../data/projects';
import { Project } from '../types';

const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3001';

/**
 * Fetch projects from Payload CMS REST API with zero-downtime static fallback
 */
export async function fetchProjectsFromCMS(): Promise<Project[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

    const res = await fetch(`${CMS_URL}/api/projects?sort=order&limit=100`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`CMS responded with status: ${res.status}`);
    }

    const data = await res.json();
    if (Array.isArray(data?.docs) && data.docs.length > 0) {
      // Normalize Payload docs to matching Project interface
      return data.docs.map((doc: any) => ({
        id: doc.id || doc._id,
        number: doc.number || '01',
        title: doc.title,
        subtitle: doc.subtitle,
        category: doc.category,
        tags: Array.isArray(doc.tags) ? doc.tags.map((t: any) => (typeof t === 'string' ? t : t.tag)) : [],
        headline: doc.headline,
        description: doc.description,
        image: typeof doc.image === 'string' ? doc.image : doc.image?.url || '/projects/hive-kms.png',
        problem: doc.problem,
        solution: doc.solution,
        metrics: Array.isArray(doc.metrics) ? doc.metrics : [],
        techStack: Array.isArray(doc.techStack)
          ? doc.techStack.map((ts: any) => ({
              category: ts.category,
              items: Array.isArray(ts.items) ? ts.items.map((i: any) => (typeof i === 'string' ? i : i.item)) : [],
            }))
          : [],
        architecture: doc.architecture || { overview: '', flowSteps: [] },
        githubUrl: doc.githubUrl,
        liveUrl: doc.liveUrl,
      }));
    }

    return staticProjects;
  } catch (err) {
    // Graceful fallback to static data if CMS is offline or unreachable
    console.warn('[CMS Client] Using offline static projects fallback:', err);
    return staticProjects;
  }
}
