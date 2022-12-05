import * as React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>書籍レビュー一覧画面</h1>
      <div>
        <Link to={`/signup`}>ユーザー作成画面へ</Link>
        <br />
        <Link to={`/login`}>ログイン画面へ</Link>
        <br />
        <Link to={`/profile`}>ユーザー情報編集画面へ</Link>
        <br />
        <Link to={`/new`}>書籍レビュー登録画面へ</Link>
        <br />
        <Link to={`/detail/0`}>書籍レビュー詳細画面へ</Link>
        <br />
        <Link to={`/edit/0`}>書籍レビュー編集画面へ</Link>
      </div>
    </>
  );
};

export default Home;
