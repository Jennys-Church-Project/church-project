/*
 * File: service.card.js                                                       *
 * Project: church-project                                                     *
 * Created Date: Th Jul yyyy                                                   *
 * Author: <<author>                                                           *
 * -----                                                                       *
 * Last Modified: Thu Jul 15 2021                                              *
 * Modified By: Windows 11 User                                                *
 * -----                                                                       *
 * Copyright (c) 2021 Windows 11 User                                          *
 */

import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

function ServiceCard({ service }) {
  // modify timestamp
  service.dateNum = service.date.substring(
    service.date.indexOf(" "),
    service.date.indexOf(",")
  );
  service.dateMonth = service.date.substr(0, 3);

  return (
    <Link key={service} href={`/dashboard/service/${service.id}`}>
      <div className="flex flex-col items-end relative border-none outline-none bg-white transition-all duration-300 rounded-xl hover:shadow hover:bg-opacity-60 max-h-104 cursor-pointer">
        {/* date */}
        <div className="absolute top-4 right-4 bg-secondary text-black flex flex-col justify-center items-center rounded-xl px-4 py-1 text-xs font-serif">
          {/* {service.date} */}
          <h3 className="text-2xl font-semibold">{service.dateNum}</h3>
          <p className="text-sm uppercase font-medium text-black text-opacity-75">
            {service.dateMonth}
          </p>
        </div>

        {/* banner */}
        <img
          src={service.banner}
          alt="image"
          className="bg-gray-100 outline-none border-none rounded-tl-xl rounded-tr-xl object-cover w-full h-2/5"
        />

        {/* info */}
        <div className="flex flex-col justify-between h-full items-end">
          <div className="flex flex-col justify-start px-4 py-3 overflow-hidden">
            <div className="grid grid-cols-5 gap-x-2 mb-2">
              {/* title */}
              <h6 className="text-base col-span-3">{service.title}</h6>

              {/* duration */}
              <div className="bg-primary text-white rounded p-1 col-span-2 h-6">
                <p className="text-xs font-serif text-center">
                  {service.duration}
                </p>
              </div>
            </div>

            {/* description */}
            <p className="text-xs text-black text-opacity-50 font-serif">
              {service.desc}
            </p>

            {/* separator */}
            <div className="border-b-2 border-gray-50 mx-2 my-3"></div>

            {/* speakers */}
            <p className="text-xs font-medium font-serif text-gray-400 mb-1">
              Speakers
            </p>
            <div className="flex -space-x-3">
              {service.speakers.map((speaker, key) => {
                return (
                  <img
                    key={key}
                    src={speaker.avatar}
                    alt={speaker.name}
                    className="avatar"
                  />
                );
              })}
            </div>
          </div>

          {/* show details */}
          <div
            onClick={() => router.push(`/dashboard/service/${service.id}`)}
            className="bg-primary cursor-pointer mr-4 mb-4 items-center justify-center rounded-full flex flex-row space-x-1 text-white py-3 px-4"
          >
            <h6 className="font-serif text-xs text-center">Learn more</h6>
            <BsArrowRight />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
