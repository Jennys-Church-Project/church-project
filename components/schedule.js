/*
 * File: schedule.js                                                           *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 11:07:51 am                          *
 * -----                                                                       *
 * Last Modified: Saturday, June 12th 2021 5:16:34 pm                          *
 */

import { useState } from "react";
import Image from "next/image";
import SectionHeader from "./section.header";
import { speakers } from "../utils/constants";
import Speaker from "./speaker";

function Schedule() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto flex flex-col">
        <SectionHeader title="Event Schedule" />

        <div className="grid grid-cols-3 grid-flow-row gap-x-5">
          {[0, 1, 2].map((event, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-400 p-8 cursor-pointer"
            >
              <h6 className="mb-4">Monday - January 1{index}, 2021</h6>
              <ul className="flex flex-col list-inside list-disc text-sm">
                <li><a href="#">9:30 - 12:00pm Worship &amp; Teaching</a></li>
                <li><a href="#">2:00 - 4:00pm Session</a></li>
                <li><a href="#">7:00 - 10:00pm Worship &amp; Teaching</a></li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
