function UserCard({ speaker, onClick }) {
  return (
    <div
      onClick={onClick}
      key={speaker.id}
      className="flex flex-row space-x-4 w-full hover:rounded-md hover:bg-gray-100 hover:shadow-sm transition-all duration-300 cursor-pointer py-1 px-2"
    >
      <img src={speaker.avatar} alt={speaker.name} className="avatar" />
      <div className="flex flex-col group">
        <h6 className="font-medium font-sans text-sm group-hover:text-gray-600">
          {speaker.name}
        </h6>
        <p className="font-serif text-gray-400 group-hover:text-gray-400 text-sm">
          {speaker.church}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
