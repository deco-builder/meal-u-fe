import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from '../contexts/authContext';

interface Creator {
  name: string;
  profile_picture: string;
}

export interface MealkitData {
  id: number;
  name: string;
  image: string;
  creator: Creator;
  created_at: string;
  description: string;
  dietary_details: string[];
  price: number;
}

interface MealkitListParams {
  search: string;
}

export const useMealkitList = (params: MealkitListParams): UseQueryResult<MealkitData[], Error> => {
  const { getToken } = useAuth();
  const token = getToken() || '';

  const fetchMealkits = async (): Promise<MealkitData[]> => {
    const url = params.search && params.search !== "Show All"
      ? `http://meal-u-api.nafisazizi.com:8001/api/v1/community/mealkits/?categories=${encodeURIComponent(params.search)}`
      : 'http://meal-u-api.nafisazizi.com:8001/api/v1/community/mealkits/';

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch mealkits');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch mealkits');
    }

    return data.data;
  };

  return useQuery<MealkitData[], Error, MealkitData[], [string, MealkitListParams]>({
    queryKey: ['mealkit.list', params],
    queryFn: fetchMealkits,
    initialData: [],
    enabled: !!token,
  });
};