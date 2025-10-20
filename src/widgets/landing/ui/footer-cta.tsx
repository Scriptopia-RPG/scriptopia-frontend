const FooterCTA = () => {
  return (
    <footer className="relative bg-gradient-to-t from-[#0a0a0d] via-[#151518] to-[#151518] mt-0">
      {/* 그라디언트 오버레이 */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent pointer-events-none"></div>
      
      <div className="relative w-full px-6 py-16 sm:px-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <div className="flex gap-6">
            <span className="hover:text-orange-400 transition-colors cursor-pointer">이용약관</span>
            <span className="hover:text-orange-400 transition-colors cursor-pointer">개인정보처리방침</span>
            <span className="hover:text-orange-400 transition-colors cursor-pointer">필드북</span>
          </div>
          <span className="text-gray-400">© 2025 팀 이름. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterCTA;
