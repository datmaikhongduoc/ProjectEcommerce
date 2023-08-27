import {
  IProductCreateResultApi,
  IProductDeleteResultApi,
  IProductGetAllResultApi,
  IProductGetOneResultApi,
  IProductUpdateBasicResultApi,
  IProductMainInfoDeleteResultApi,
  IProductMainInfoGetOneResultApi,
  IProductMainInfoUpdateResultApi,
  IProductProvideMainInfoResultApi,
  IProductSearchResultApi,
} from "@/api-types/IProductResultApi";
import { IProduct } from "@/interfaces";
import { useParams } from "react-router-dom";
import IArgsQuery from "@/helpers/IArgsQuery";
import { http, getErrorMessage, resultAppendFormData } from "@/utils";
import { PATH_API_V1 } from "@/constant";

class ProductApi {
  async createProduct(args: IProductCreateResultApi) {
    try {
      const response = await http.postForm(
        `${PATH_API_V1.product}/create`,
        resultAppendFormData(args)
      );
      console.log(response);
      const result: Omit<
        IProductCreateResultApi,
        "isCreatingProduct" | "createProduct"
      > = response.data;
      return result;
    } catch (error: any) {
      console.error(error);
      throw new Error(getErrorMessage(error));
    }
  }

  async provideProductMainInfo(args: IProductMainInfoCreate) {
    const { _id, ...dataCreate } = args;
    try {
      const response = await http.patchForm(
        `${PATH_API_V1.product}/provideInfo/${args.product}`,
        resultAppendFormData(dataCreate)
      );
      console.log(response);
      const result: Omit<
        IProductProvideMainInfoResultApi,
        "isAddingProduct" | "provideProductMainInfo"
      > = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getProductById(arg: Pick<IProduct, "_id">) {
    try {
      const response = await http.get(
        `${PATH_API_V1.product}/getById/${arg._id}`
      );

      const result: Omit<IProductGetOneResultApi, "isGettingProduct"> =
        response.data;

      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getProductMainInfoById(arg: Pick<IProductMainInfo, "_id">) {
    try {
      const response = await http.get(
        `${PATH_API_V1.product}/getMainInfoById/${arg._id}`
      );

      const result: Omit<IProductMainInfoGetOneResultApi, "isGettingProduct"> =
        response.data;

      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllProducts(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${PATH_API_V1.product}/getAll`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          status: fieldsQuery.status,
          numericFilters: fieldsQuery.numericFilters,
        },
      });

      //   console.log("response::::", response);
      const result: Omit<IProductGetAllResultApi, "isGettingProducts"> =
        response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async searchProducts(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${PATH_API_V1.product}/search`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          keySearch: fieldsQuery.keySearch,
          numericFilters: fieldsQuery.numericFilters,
        },
      });

      //   console.log("response::::", response);
      const result: Omit<IProductSearchResultApi, "isSearchingProducts"> =
        response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateProductBasic(args: Partial<IProduct>) {
    console.log(args);
    try {
      const response = await http.patchForm(
        `${PATH_API_V1.product}/update/${args._id}`,
        resultAppendFormData(args)
      );
      const result: Omit<
        IProductUpdateBasicResultApi,
        "isUpdatingProduct" | "updateProductBasic"
      > = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateProductMainInfo(args: IProductMainInfo) {
    try {
      const response = await http.patchForm(
        `${PATH_API_V1.product}/updateMainInfo/${args.product}`,
        resultAppendFormData(args)
      );
      const result: Omit<
        IProductMainInfoUpdateResultApi,
        "isUpdatingProduct" | "updateProductMainInfo"
      > = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async deleteProductMainInfo(arg: Pick<IProductMainInfo, "_id">) {
    const { productId } = useParams();
    try {
      const response = await http.delete(
        `${PATH_API_V1.product}/deleteMainInfo/${productId}`,
        { data: { _id: arg._id } }
      );
      const result: Omit<
        IProductMainInfoDeleteResultApi,
        "isDeletingProduct" | "deleteProductMainInfo"
      > = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async deleteProduct(arg: Pick<IProduct, "_id">) {
    try {
      const response = await http.delete(
        `${PATH_API_V1.product}/delete/${arg._id}`
      );
      const result: Omit<
        IProductDeleteResultApi,
        "isDeletingProduct" | "deleteProduct"
      > = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new ProductApi();
