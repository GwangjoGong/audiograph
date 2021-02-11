export const Manage = () => {
  return (
    <div className="container overflow-auto relative">
      <div className="w-full">
        <h2 className="mt-3 font-medium text-xl">manage</h2>
        <div className="mt-3 shadow-mini rounded-md py-5 px-4 text-center">
          <div className="text-sm font-medium text-purple-600 mb-3">
            Total Asset
          </div>
          <div className="text-md">10,200 Hbar (+24.2%)</div>
        </div>
        <div className="mt-3 shadow-drop rounded-md py-5 px-4">
          <div className="text-sm mb-3">owned</div>
        </div>
      </div>
    </div>
  );
};
