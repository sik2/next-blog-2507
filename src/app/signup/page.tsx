function Signup() {
  return (
    <>
      <form>
        <input type="email" name="email" placeholder="EMAIL" />
        <input type="password" name="password" placeholder="PASSWORD" />
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}

export default Signup;
