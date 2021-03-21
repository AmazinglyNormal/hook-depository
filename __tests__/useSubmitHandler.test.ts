import { FormEvent } from "react";
import { renderHook } from "@testing-library/react-hooks";
import useSubmitHandler from "../src/useSubmitHandler";

const event = { type: "submit" } as FormEvent<HTMLFormElement>;
event.preventDefault = () => {
  return;
};

const errorFunc = (err: Error) => {};

test("should return async fucntion", () => {
  const submitFunc = async (event: FormEvent<HTMLFormElement>) => {
    await Promise.resolve();
  };

  const { result } = renderHook(() => useSubmitHandler(submitFunc, errorFunc));

  expect(typeof result.current).toBe("function");
});

test("should resolve promise of submit function", async () => {
  const submitFunc = async (event: FormEvent<HTMLFormElement>) => {
    await Promise.resolve("success");
  };

  const { result } = renderHook(() => useSubmitHandler(submitFunc, errorFunc));

  expect(result.current(event)).resolves.not.toThrow();
});

test("should reject promise of submit function and trigger reject funciton", async () => {
  const submitFunc = async (event: FormEvent<HTMLFormElement>) => {
    await Promise.reject(new Error("fail"));
  };
  const errorFunc = (err: Error) => {};

  const { result } = renderHook(() => useSubmitHandler(submitFunc, errorFunc));

  expect(result.current(event)).resolves.not.toThrow();
});
