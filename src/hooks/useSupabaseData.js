'use client';

import { useEffect, useState } from 'react';
import createSupabaseClient from '@/lib/supabase/client';

export function useSupabaseData(tableName, { options = {} }) {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const supabaseClient = createSupabaseClient();

  const {
    select = '*',
    order = 'created_at',
    ascending = false,
    limit = 5,
    filters = {}
  } = options;

  useEffect(() => {
    if (!tableName || !supabaseClient) {
      setFetchedData([]);
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabaseClient
          .from(tableName)
          .select(select)
          .is('deleted_at', null)
          .order(order, { ascending })
          .limit(limit);

        if (error) {
          console.error('Client Data Fetch Error:', error);
          setError(error);
          setFetchedData([]);
        } else {
          setFetchedData(data || []);
        }

        setLoading(false);
      } catch (e) {
        console.error('Unexpected Client Error:', e);
        setError(e);
        setFetchedData([]);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [tableName, select, order, ascending, limit, JSON.stringify(filters)]);

  return { dbData: fetchedData, loading, error };
}
