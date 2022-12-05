import * as React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1>ログイン作成画面</h1>
      <div>
        <Link to={`/`}>レビュー一覧へ戻る</Link>
      </div>
    </>
  );
};

export default Login;
