import * as React from "react";
import { Link } from "react-router-dom";

const ReviewDetail = () => {
  return (
    <>
      <h1>書籍レビュー詳細画面</h1>
      <div>
        <Link to={`/`}>レビュー一覧へ戻る</Link>
      </div>
    </>
  );
};

export default ReviewDetail;
