import { format } from "date-fns";
import { useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function MeetingCard({ meeting, onClick }) {
  //   useEffect(() => {
  //     console.log(new Date().getTime());
  //   }, []);
  return (
    <div
      className="bg-white rounded-xl cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="flex flex-row w-full py-6 px-4 items-center space-x-4 relative">
        {/* type */}
        <div
          className={`${
            meeting.type === "youth" ? "bg-purple-700" : "bg-green-700"
          } absolute bottom-0 right-0 px-8 py-1 rounded-tl-xl text-white`}
        >
          <p className="text-center text-xs font-serif font-medium uppercase">
            {meeting.type}
          </p>
        </div>

        {/* meeting details */}
        <div className="flex flex-col space-y-px flex-1">
          <p className="line-clamp-1 overflow-ellipsis">{meeting.title}</p>
          <p className="text-sm text-gray-500">
            {format(meeting.date, "(eee) MMM dd, yyyy")}
          </p>
        </div>

        {/* icon */}
        <FaLongArrowAltRight className="" />
      </div>
    </div>
  );
}

export default MeetingCard;
