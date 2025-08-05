export interface ApiResultDto<T> {
  success: boolean;
  data?: T;
  errorCode?: string;
}