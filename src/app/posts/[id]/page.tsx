"use client";

import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PostDetail() {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    setPost(data);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id);
    setComments(data);
  };

  useEffect(() => {
    fetchData();
    fetchComments();
    setIsLoading(false);
  }, []);

  const handleDelete = async () => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      alert(error.message);
      console.log(error);
    } else {
      alert("게시글이 삭제되었습니다.");
      router.push("/posts");
    }
  };

  const handleCommentDelete = async (id) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) {
      alert(error.message);
      console.log(error);
    } else {
      alert("댓글 삭제되었습니다.");
      fetchComments(); // 댓글 삭제 후 다시 댓글 목록을 가져옵니다.
    }
  };

  if (isLoading) {
    return <>로딩중...</>;
  }

  return (
    <>
      <h1>{id}번</h1>
      <div className="text-2xl">{post.title}</div>
      <p>{post.contents}</p>
      <button onClick={handleDelete} className="border border-red-300 p-3">
        삭제
      </button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="text-xs underline">
            {comment.contents}
            <button
              onClick={() => handleCommentDelete(comment.id)}
              className="border border-red-300 p-1"
            >
              삭제
            </button>
            <ul></ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PostDetail;
