import * as React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <h1>ユーザー作成画面</h1>
      <div>
        <Link to={`/`}>レビュー一覧へ戻る</Link>
      </div>
    </>
  );
};

export default SignUp;
