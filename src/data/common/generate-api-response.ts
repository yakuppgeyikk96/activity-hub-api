import { IApiResponse } from "../../common/types";

export default function generateApiResponse<T>(
  isSuccess: boolean,
  status: number,
  message: string,
  result: T | null
): IApiResponse<T> {
  return {
    success: isSuccess,
    status,
    message,
    result,
  };
}
