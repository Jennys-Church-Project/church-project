/*
 * File: speaker.js                                                            *
 * Project: church-project                                                     *
 * Created Date: Friday, June 11th 2021, 8:18:26 pm                            *
 * -----                                                                       *
 * Last Modified: Friday, June 11th 2021 8:43:02 pm                            *
 */

import { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const Speaker = ({ person }) => {
  // about speaker state
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="flex flex-col text-center text-black transition duration-150">
      {/* avatar */}
      <img
        src={person.avatar}
        alt={person.name}
        className="rounded w-full h-60 lg:h-60 object-cover mb-6 cursor-pointer"
      />

      {/* speaker */}
      <h3 className="text-2xl font-medium">{person.name}</h3>
      <p className="text-sm font-medium my-2">{person.church}</p>
      {showAbout ? (
        <>
          <p className="text-base">{person.bio}</p>
          <div
            className="flex flex-col items-center my-8 cursor-pointer justify-center space-y-1"
            onClick={() => setShowAbout(!showAbout)}
          >
            <AiOutlineClose />
            <p className="uppercase font-medium text-sm">Close</p>
          </div>
        </>
      ) : (
        <>
          <div
            className="flex flex-col my-10 items-center justify-center space-y-1 cursor-pointer"
            onClick={() => setShowAbout(!showAbout)}
          >
            <AiOutlinePlus className="" />
            <h6 className="uppercase font-medium text-sm">About Speaker</h6>
          </div>
        </>
      )}
    </div>
  );
};

export default Speaker;
