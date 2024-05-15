
// [NEW] 신규 컴포넌트
// 에러 리스트 보여줄 때 해결, 미해결 상태 컴포넌트
// onClick이나 prop 달기 귀찮아서 색깔 다른거 두개 만들었음
// 해결은 한번도 못봐서 어떻게 생긴지 모름
// 그냥 파일 추가하면 될듯

const ErrorMark = () => {
  return (
    <div className="flex h-8 w-fit pl-2.5 pr-1.5 rounded-full items-center justify-between overflow-hidden bg-[rgba(255,119,119,0.30)]">
        <div className="flex items-center justify-center h-[85%] w-fit mr-1.5 text-xs text-white">
            미해결
        </div>
        <img
            className="h-[75%] aspect-square"
            alt="Circle X Icon"
            src={
                "/icons/ErrorUnSolved.svg"
            }
        />
    </div>
  );
};

const SolvedErrorMark = () => {
  return (
    <div className="flex h-8 w-fit pl-2.5 pr-1.5 rounded-full items-center justify-between overflow-hidden bg-[rgba(107,185,166,0.30)]">
        <div className="flex items-center justify-center h-[85%] w-fit mr-1.5 text-xs text-white">
            해결
        </div>
        <img
            className="h-[75%] aspect-square"
            alt="Circle X Icon"
            src={
                "/icons/ErrorSolved.svg"
            }
        />
    </div>
  );
};

export {ErrorMark, SolvedErrorMark};