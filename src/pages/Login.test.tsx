import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import { Provider } from "react-redux";
import { store } from "../components/store";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("メールアドレス入力フィールドがあるか", () => {
  const { container } = render(
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
  const input = container.querySelector(`input[name="email"]`);
  expect(input).not.toBe(null);
  if (input !== null) fireEvent.input(input, { target: { value: "test" } });
  expect(input).toHaveValue("test");
});

test("パスワード入力フィールドがあるか", () => {
  const { container } = render(
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
  const input = container.querySelector(`input[name="password"]`);
  expect(input).not.toBe(null);
  if (input !== null) fireEvent.input(input, { target: { value: "test" } });
  expect(input).toHaveValue("test");
});

test("ログインボタンがあるか", () => {
  render(
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
  const labelEmail = screen.getByRole("button", { name: "ログイン" });
  expect(labelEmail).toBeInTheDocument();
});
