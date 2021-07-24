import { FaLongArrowAltRight } from "react-icons/fa";

function DashboardHeaderCardItem({ title, subtitle, Icon, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${
        active ? "text-white bg-black" : "text-black bg-white"
      } w-full overflow-hidden px-6 py-4 hover:shadow-lg shadow-sm transition-all duration-200 space-y-4 rounded-xl relative cursor-pointer flex flex-col`}
    >
      <div className="flex flex-row items-center space-x-1 text-base">
        <Icon className={`${active ? "text-white" : "text-gray-600"}`} />
        <h6
          className={`${
            active ? "text-gray-100" : "text-gray-600"
          } font-medium`}
        >
          {title}
        </h6>
      </div>
      <h1 className={`text-4xl font-serif`}>{subtitle}</h1>
      <div
        className={`${
          active ? "bg-white" : "bg-black"
        } absolute top-8 -right-16 rounded-full w-56 h-56`}
      />
      <FaLongArrowAltRight
        className={`${
          active ? "text-black" : "text-white"
        } absolute bottom-4 right-4`}
      />
    </div>
  );
}

export default DashboardHeaderCardItem;
