import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ClientTypes } from '../../utils/data.interfaces';
import {
  AddDataToDataBaseQuery,
  DeleteDataFromDatabaseQuery,
  fetchDataQuery,
  UpdateDataToDatabaseQuery,
} from '../../services/ApiService';

const useStackholderData = (ClientID = 2) => {
  const queryClient = useQueryClient();

  // Fetch Stackholder data
  const { data: Stackholder, isLoading: isLoadingStack } = useQuery({
    queryKey: ['Stackholder'],
    queryFn: () => fetchDataQuery(ClientTypes.Stakeholders, ClientID),
    staleTime: Infinity,
  });

  // Add Stackholder mutation
  const { mutateAsync: addStackholderMutation } = useMutation({
    mutationFn: ({ matrixObject, typeParameter, clientID }: any) =>
      AddDataToDataBaseQuery({ matrixObject, typeParameter, clientID }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Stackholder'] });
    },
  });

  //   // Delete Stackholder mutation
  const { mutateAsync: deleteStackholderMutation } = useMutation({
    mutationFn: ({ matrixObject, typeParameter }: any) => DeleteDataFromDatabaseQuery({ matrixObject, typeParameter }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Stackholder'] });
    },
  });

  //   // Update Stackholder mutation
  const { mutateAsync: updateStackholderMutation } = useMutation({
    mutationFn: ({ matrixObject, typeParameter, clientID }: any) =>
      UpdateDataToDatabaseQuery({ matrixObject, typeParameter, clientID }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Stackholder'] });
    },
  });

  return {
    Stackholder,
    isLoadingStack,
    addStackholderMutation,
    deleteStackholderMutation,
    updateStackholderMutation,
  };
};

export default useStackholderData;