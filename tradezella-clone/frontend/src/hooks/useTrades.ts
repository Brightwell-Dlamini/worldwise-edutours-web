import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTrades = async () => {
    const { data } = await axios.get('/trades');
    return data;
};

const useTrades = () => {
    return useQuery({
        queryKey: ['trades'],
        queryFn: fetchTrades,
        staleTime: 1000 * 60, // 1 min cache
    });
};

export default useTrades;