import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BrandApi } from "@/apis";
import {
  IBrandCreateResultApi,
  IBrandGetAllResultApi,
  IBrandUpdateResultApi,
  IBrandDeleteResultApi,
} from "@/api-types/IBrandResultApi";
import { toast } from "react-hot-toast";
import { CONSTANT, getQueriesString } from "@/utils";
import { useSearchParams } from "react-router-dom";
import { useQueriesString } from "@/hooks";
``;

class UseBrandApi {
  static createBrand(): IBrandCreateResultApi {
    const queryClient = useQueryClient();
    const { data, mutate, isLoading } = useMutation({
      mutationFn: BrandApi.createBrand,
      onSuccess: (data: any) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });

    return {
      createBrand: mutate,
      isCreatingBrand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getAllBrand(): IBrandGetAllResultApi {
    const queryClient = useQueryClient();
    const {
      sort,
      page: currentPage,
      limit,
    } = getQueriesString(useQueriesString());
    const { data, isLoading } = useQuery({
      queryKey: ["brands", currentPage, sort],
      queryFn: () =>
        BrandApi.getAllBrands({
          sort,
          page: currentPage,
          limit,
        }),
    });
    let numberPage: number = 1;
    if (data?.metadata?.totalBrands)
      numberPage = Math.ceil(data?.metadata?.totalBrands / limit);
    // Get Data Next Page
    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ["brands", currentPage + 1, sort],
        queryFn: () =>
          BrandApi.getAllBrands({
            sort,
            page: currentPage + 1,
            limit,
          }),
      });

    // Get Data Next Page
    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["brands", currentPage - 1, sort],
        queryFn: () =>
          BrandApi.getAllBrands({
            sort,
            page: currentPage - 1,
            limit,
          }),
      });

    return {
      isGettingBrands: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateBrand(): IBrandUpdateResultApi {
    const queryClient = useQueryClient();
    const { mutate, isLoading, data } = useMutation({
      mutationFn: BrandApi.updateBrand,
      onSuccess: (data) => {
        toast.success(data.message || "Update brand successfully");
        queryClient.invalidateQueries({
          queryKey: ["brands"],
        });
      },
    });

    return {
      updateBrand: mutate,
      isUpdatingBrand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static deleteBrand(): IBrandDeleteResultApi {
    const queryClient = useQueryClient();
    const { mutate, isLoading, data } = useMutation({
      mutationFn: BrandApi.deleteBrand,
      onSuccess: () => {
        toast.success("Delete Brand Successfully");
        queryClient.invalidateQueries({
          queryKey: ["brands"],
        });
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });

    return {
      deleteBrand: mutate,
      isDeletingBrand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}

export default UseBrandApi;
