function SignIn() {
  // supabase.auth.signInWithPassword({ email, password });

  return (
    <>
      <h1>로그인</h1>
      <form>
        <input type="email" name="email" placeholder="EMAIL" />
        <input type="password" name="password" placeholder="PASSWORD" />
        <button type="submit">로그인</button>
      </form>
    </>
  );
}

export default SignIn;
