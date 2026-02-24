import { SITE_URL } from '@/constants/general';
import { getLangRoutes } from '@/lib/lang';
import { getSupabaseData } from '@/lib/supabase/getSupbaseData';

export default async function sitemap() {
  let allRoutes = [];

  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${SITE_URL}/experiences`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/educations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];

  const queryOptions = {
    select: 'id, experience_id, updated_at',
    limit: 50,
    skipSoftDelete: true,
    isActiveFilter: true
  };

  try {
    const [experiences, educations, projects] = await Promise.all([
      getSupabaseData('experiences', {
        ...queryOptions,
        select: 'id, experience_id, updated_at'
      }),
      getSupabaseData('educations', {
        ...queryOptions,
        select: 'id, education_id, updated_at'
      }),
      getSupabaseData('projects', {
        ...queryOptions,
        select: 'id, project_id, updated_at'
      })
    ]);

    const experienceRoutes = (experiences.dbData || []).map((item) => ({
      url: `${SITE_URL}/experiences/${item.experience_id}`,
      lastModified: item.updated_at
        ? new Date(item.updated_at)
        : new Date(item.created_at),
      changeFrequency: 'monthly',
      priority: 0.6
    }));

    const educationRoutes = (educations.dbData || []).map((item) => ({
      url: `${SITE_URL}/educations/${item.education_id}`,
      lastModified: item.updated_at
        ? new Date(item.updated_at)
        : new Date(item.created_at),
      changeFrequency: 'monthly',
      priority: 0.6
    }));

    const projectRoutes = (projects.dbData || []).map((item) => ({
      url: `${SITE_URL}/projects/${item.project_id}`,
      lastModified: item.updated_at
        ? new Date(item.updated_at)
        : new Date(item.created_at),
      changeFrequency: 'monthly',
      priority: 0.6
    }));

    allRoutes = [
      ...staticRoutes,
      ...experienceRoutes,
      ...educationRoutes,
      ...projectRoutes
    ];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    allRoutes = staticRoutes;
  }

  return getLangRoutes(allRoutes);
}
