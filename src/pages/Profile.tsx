import * as React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <h1>ユーザー情報編集画面</h1>
      <div>
        <Link to={`/`}>レビュー一覧へ戻る</Link>
      </div>
    </>
  );
};

export default Profile;
