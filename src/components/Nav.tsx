"use client";

import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Nav() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  return (
    <nav className="flex">
      <Link href="/" className="p-2 rounded hover:bg-gray-100">
        메인
      </Link>
      <Link href="/posts" className="p-2 rounded hover:bg-gray-100">
        글 목록
      </Link>
      {user ? (
        <>
          <span>{user.email} 님</span>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <Link href="/signup" className="p-2 rounded hover:bg-gray-100">
            회원가입
          </Link>
          <Link href="/signin" className="p-2 rounded hover:bg-gray-100">
            로그인
          </Link>
        </>
      )}
    </nav>
  );
}

export default Nav;
