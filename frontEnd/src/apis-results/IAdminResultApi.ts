import { UseMutateFunction } from "@tanstack/react-query";
import IApi from "@/helpers/IApi";
import { IUser } from "@/interfaces";
import { IAuthRegister } from "@/interfaces/auth.interface";

/**
 *  ------- available -------
 *  message
 *  metadata
 *  reasonStatusCode
 *  statusCode
 *  ------- optional(customer) -------
 *  isGetting
 *  isCreating
 *  isUpdating
 *  isDeleting
 *  create
 *  update
 *  delete
 */

export interface IAdminCreateUserResultApi extends IApi {
  isCreatingUser: boolean;
  metadata: IUser | undefined;
  createUser: UseMutateFunction<IApi, any, IAuthRegister>;
}

export interface IAdminGetAllUserResultApi extends IApi {
  isGettingUsers: boolean;
  metadata:
    | {
        totalUsers: number;
        usersPerPage: number;
        users: Array<IUser>;
      }
    | undefined;
}

export interface IAdminSearchUserResultApi extends IApi {
  isSearchingUsers: boolean;
  metadata:
    | {
        totalUsers: number;
        usersPerPage: number;
        users: Array<IUser>;
      }
    | undefined;
}

export interface IAdminUpdateUserResultApi extends IApi {
  isUpdatingUser: boolean;
  metadata: IUser | undefined;
  updateUser: UseMutateFunction<any, unknown, Partial<IUser>>;
}

export interface IAdminDeleteUserResultApi extends IApi {
  isDeletingUser: boolean;
  metadata: IUser | undefined;
  deleteUser: UseMutateFunction<any, unknown, Pick<IUser, "_id">>;
}
