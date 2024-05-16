import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const GITHUB_LOGIN_URL =
  "https://k10a308.p.ssafy.io/oauth2/authorization/github/api";

const IndexPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 로그인 상태 확인
    const checkLogin = () => {
      const accessToken = Cookies.get("access");
      if (accessToken) {
        navigate("/omegi"); // access 토큰이 존재하면 메인 페이지로 이동
      }
    };

    checkLogin();
  }, [navigate]);

  const handleLoginClick = () => {
    window.location.href = GITHUB_LOGIN_URL;
  };

  return (
    <div className="bg-base flex h-svh w-screen flex-col text-5xl font-extrabold text-black">
      메인화면으로 가고싶다면 경로에 /omegi를 추가로 입력해라
      <div className="h-5/6">
        <button
          onClick={handleLoginClick}
          className="box-border rounded-2xl border-sky-200 bg-sky-200 px-5 py-2 text-xl"
        >
          로그인1
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
