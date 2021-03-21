import { FormEvent } from "react";

function useSubmitHandler(
  submitFunction: (event: FormEvent<HTMLFormElement>) => Promise<any>,
  errorFunction: (error: Error) => void
) {
  return async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await submitFunction(event);
    } catch (error) {
      errorFunction(error);
    }
  };
}

export default useSubmitHandler;
