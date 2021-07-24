function DashboardHeaderCardItem({ title, subtitle, Icon }) {
  return (
    <div className="w-full overflow-hidden px-6 py-4 hover:shadow-lg shadow-sm transition-all duration-200 space-y-4 text-black bg-white rounded-xl relative cursor-pointer flex flex-col">
      <div className="flex flex-row items-center space-x-1 text-base">
        <Icon className="text-indigo-700" />
        <h6 className="font-medium">{title}</h6>
      </div>
      <h1 className="text-4xl">{subtitle}</h1>
      <div className="absolute top-8 -right-16 rounded-full w-56 h-56 bg-indigo-700"></div>
    </div>
  );
}

export default DashboardHeaderCardItem;
