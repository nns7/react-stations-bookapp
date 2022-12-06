import * as React from "react";
import { Link } from "react-router-dom";

const ReviewAdd = () => {
  return (
    <>
      <h1>書籍レビュー登録画面</h1>
      <div>
        <Link to={`/`}>レビュー一覧へ戻る</Link>
      </div>
    </>
  );
};

export default ReviewAdd;
