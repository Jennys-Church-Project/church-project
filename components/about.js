/*
 * File: about.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 11:05:37 am                          *
 * -----                                                                       *
 * Last Modified: Thursday, June 17th 2021 1:58:54 pm                          *
 */

import SectionHeader from "./section.header";
import { FaPlay } from "react-icons/fa";

function About() {
  return (
    <div className="w-screen flex flex-col border-b border-gray-400">
      <div className="mx-auto w-full md:container xl:max-w-6xl pb-12">
        <SectionHeader title="About" />
        {/* program description */}
        <h2 className="text-2xl px-8 md:text-4xl lg:px-20 xl:px-0 lg:text-6xl text-center">
          Kingdom Domain is a 5 day event to worship and learn more about your
          purpose in Christ
        </h2>

        {/* program video container */}
        <div className="relative w-11/12 xl:max-w-3xl mx-auto items-center justify-center my-12 h-80 rounded flex">
          {/* image for program */}
          <img
            src="./lift_hands.jpg"
            alt="worship"
            className="cover__image h-full"
          />
          {/* playback icon */}
          {/* TODO -> add playback functionality */}
          <div
            className="cursor-pointer rounded-full text-center h-16 w-16 -ml-8 -mt-6 text-white flex items-center justify-center bg-opacity-30 bg-gray-200 absolute inset-1/2"
            onClick={() => console.log("clicked playback")}
          >
            <FaPlay />
          </div>
        </div>

        {/* metadata */}
        <h6 className="text-base text-center">
          Watch a recap of last year's event
        </h6>
      </div>
    </div>
  );
}

export default About;
