"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

function PostDetail() {
  const params = useParams();
  const { id } = params;

  console.log(id);
  useState();

  return (
    <>
      <h1>{id}번</h1>
      <div>게시글 상세</div>
    </>
  );
}

export default PostDetail;
