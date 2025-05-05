const Header = () => {
  return(
    <>
      <header className="w-screen gradationUnderBar">
        <div className="w-full max-w-7xl mx-auto px-10 py-6">
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