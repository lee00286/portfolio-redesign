'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export function useSupabaseData(tableName) {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    if (!tableName) {
      setFetchedData([]);
    }

    const fetchProjects = async () => {
      const { data, error } = await supabase.from(tableName).select('*');

      if (error) console.error('Error:', error);
      else setFetchedData(data);
    };

    fetchProjects();
  }, [tableName]);

  return { dbData: fetchedData };
}
