import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";

function AdminUserCard({ person, isSpeaker, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-full overflow-hidden bg-white h-32 rounded-xl flex flex-col relative"
    >
      <div
        className={`bg-black absolute top-1/2 -right-1/2 rounded-full w-56 h-56`}
      />
      <FaLongArrowAltRight className={`text-white absolute bottom-4 right-4`} />

      <div className="flex space-x-2">
        {/* avatar */}
        <div className="w-16 h-16 bg-gray-100 rounded-br-lg overflow-hidden">
          {person.avatar && (
            <Image
              src={person.avatar}
              width={64}
              height={64}
              objectFit="cover"
            />
          )}
        </div>
        {/* full name */}
        <div className="flex flex-col pt-2 flex-1">
          <h6 className="text-sm">
            {person.first_name} {person.last_name}
          </h6>
          <p className="text-xs text-gray-600 font-serif">{person.email}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminUserCard;
