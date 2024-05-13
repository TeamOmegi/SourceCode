import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(`/login`);
  };

  return (
    <div className="bg-base flex h-svh w-screen flex-col text-5xl font-extrabold text-black">
      메인화면으로 가고싶다면 경로에 /omegi를 추가로 입력해라
      <div className="h-5/6">
        <button
          onClick={handleLoginClick}
          className="box-border rounded-2xl border-sky-200 bg-sky-200 px-5 py-2 text-xl"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
