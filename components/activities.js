/*
 * File: activities.js                                                         *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 11:05:59 am                          *
 * -----                                                                       *
 * Last Modified: Thursday, June 17th 2021 1:58:40 pm                          *
 */

import { useState } from "react";
import SectionHeader from "./section.header";
import { speakers } from "../utils/constants";
import Speaker from "./speaker";

function Activities() {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = ["Speakers", "Worship"];

  return (
    <div className="w-screen flex flex-col my-20 justify-center">
      <SectionHeader title="Special Guests" />

      {/* tabs */}
      <div className="flex flex-row space-x-4 items-center justify-center">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`text-center cursor-pointer outline-none border-none`}
          >
            <button
              className={`${
                index === currentTab
                  ? "font-semibold text-lg border-b-2 border-black"
                  : "text-opacity-30 text-base hover:text-opacity-100 hover:border-b-2 hover:border-black font-light transition duration-150"
              } text-black`}
              onClick={() => setCurrentTab(index)}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>

      {/* grid of speakers */}
      {currentTab === 0 && (
        <>
          <div className="flex flex-col justify-center space-y-4 my-12 px-6 container rounded lg:mx-auto md:grid md:grid-cols-2 md:gap-x-3 lg:space-y-0 lg:gap-x-4 lg:gap-y-6 lg:grid-cols-3 lg:grid-flow-row">
            {speakers.map((person, index) => (
              <Speaker key={index} person={person} />
            ))}
          </div>
        </>
      )}

      {/* grid of worshippers */}
      {currentTab === 1 && (
        <>
          <div className="flex items-center justify-center h-80 w-full">
            <h6 className="text-black font-medium">No worshippers registered yet</h6>
          </div>
        </>
      )}
    </div>
  );
}

export default Activities;
