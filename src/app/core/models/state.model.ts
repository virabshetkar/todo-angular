export interface State<T> {
  data: T | null;
  error: any | null;
  isLoading: boolean;
  isLoaded: boolean;
}
