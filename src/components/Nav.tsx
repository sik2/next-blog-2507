"use client";

import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Nav() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getUser();

    // 인증 상태(로그인/로그아웃) 변경을 감지하는 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });
    // 클인업 함수 -> 컨포넌트가 언마운트 되거나 useEffect가 재실행되기 전
    // 이벤트 리스터 중복 호출 방지
    return () => subscription.unsubscribe();
  }, []);

  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  if (isLoading) {
    return <>로딩중...</>;
  }

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
