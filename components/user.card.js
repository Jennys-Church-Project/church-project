import { useState } from "react";

function UserCard({ speaker }) {
  const [active, setActiveSpeaker] = useState(null);

  return (
    <div
      key={speaker.id}
      className="flex flex-row space-x-4 w-full hover:bg-gray-100 hover:shadow-sm transition-all duration-300 cursor-pointer py-1 px-2"
    >
      <img src={speaker.avatar} alt={speaker.name} className="avatar" />
      <div className="flex flex-col">
        <h6 className="font-medium font-sans text-sm">{speaker.name}</h6>
        <p className="font-serif text-gray-400 text-sm">{speaker.church}</p>
      </div>
    </div>
  );
}

export default UserCard;
