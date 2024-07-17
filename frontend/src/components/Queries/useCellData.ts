import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  DeleteCellFromDatabaseQuery,
  fetchCellsQuery,
  UpdateCellsToDatabaseQuery,
  AddCellToDataBaseQuery,
} from '../../services/ApiService';
import { useStore } from '../../store';

const useCellData = () => {
  const { ClientID, GroupID } = useStore();
  const queryClient = useQueryClient();

  // Fetch Cells data
  const { data: Cells, isLoading: isLoadingCells } = useQuery({
    queryKey: ['Cells'],
    queryFn: () => fetchCellsQuery(ClientID, GroupID),
    staleTime: Infinity,
  });

  // Add Cells mutation
  const { mutateAsync: addCellsMutation } = useMutation({
    mutationFn: ({ cell }: any) => AddCellToDataBaseQuery({ cell, ClientID }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Cells'] });
    },
  });

  // Delete Cells mutation
  const { mutateAsync: deleteCellsMutation } = useMutation({
    mutationFn: ({ ID }: any) => DeleteCellFromDatabaseQuery({ ID }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Cells'] });
    },
  });

  //   // Update Cells mutation
  const { mutateAsync: updateCellsMutation } = useMutation({
    mutationFn: ({ cell }: any) => UpdateCellsToDatabaseQuery({ cell }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Cells'] });
    },
  });

  return {
    Cells,
    isLoadingCells,
    addCellsMutation,
    deleteCellsMutation,
    updateCellsMutation,
  };
};

export default useCellData;