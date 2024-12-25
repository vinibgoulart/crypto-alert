import { useQueryClient } from "@tanstack/react-query";

type InfiniteQueryData<T> = {
  pages: Array<T>;
  pageParams: unknown[];
};

type ResponseData = Record<string, any>;

export const useUpdateInfiniteQueryWithMutation = () => {
  const queryClient = useQueryClient();

  const updateInfiniteQueryWithMutation = <T extends { data: any }>(
    queryKey: readonly unknown[],
    responseData: ResponseData
  ): void => {
    queryClient.setQueryData<InfiniteQueryData<T>>(queryKey, (oldData) => {
      if (!oldData) return oldData;

      return {
        pages: [
          {
            ...oldData.pages[0],
            data: {
              ...oldData.pages[0].data,
              data: [responseData, ...oldData.pages[0].data.data],
            },
          },
          ...oldData.pages.slice(1),
        ],
        pageParams: oldData.pageParams,
      };
    });
  };

  return { updateInfiniteQueryWithMutation };
};
