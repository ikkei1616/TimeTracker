const Header = () => {
  return(
    <>
      <header className="w-screen gradationUnderBar h-[9vh]">
        <div className="w-10/12 max-w-7xl h-full mx-auto  py-6">
          <div className="flex items-center">
            <img className="w-5 h-5 mr-2.5 " src="/logo_TimeTracker.svg" alt="header-logo" />
            <h1 className="text-3xl font-bold">Time Tracker</h1>
          </div>
        </div>
      </header>
    </>

  );
}
export default Header;