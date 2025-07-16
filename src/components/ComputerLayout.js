function ComputerLayout({ children }) {
  return (
    <div className="flex justify-center items-center px-0 sm:px-4 xsm:px-8 lg:px-18 py-8 lg:py-18 w-full h-full">
      <div className="relative mx-auto my-0 max-w-[var(--breakpoint-desktop)] w-full h-full xxmd:h-auto xxmd:aspect-[4/3] xl:aspect-[16/10] bg-primary-600 rounded-2xl border-4 p-6 mb-[20px] md:mb-[40px] xxmd:mb-[50px] border-primary-500 shadow-inner">
        {/* Computer Monitor */}
        <div className="relative flex justify-center items-center m-auto rounded-xl w-full h-full bg-white shadow-inner">
          {children}
        </div>

        {/* Computer Stand */}
        <div className="absolute bottom-[-20px] md:bottom-[-40px] xxmd:bottom-[-50px] left-1/2 -translate-x-1/2 rounded-full w-[100px] md:w-[200px] h-[10px] md:h-[20px] bg-primary-600"></div>
      </div>
    </div>
  );
}

export default ComputerLayout;
