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

import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { format } from "date-fns";

function ServiceCard({ service, onClick }) {
  // modify timestamp
  service.dateNum = format(new Date(service.date), "dd");
  service.dateMonth = format(new Date(service.date), "MMM");
  service.duration = format(new Date(service.date), "hh:mm a");

  return (
    <div
      onClick={onClick}
      className="w-full flex flex-col items-end relative border-none outline-none bg-white transition-all duration-300 rounded-xl hover:shadow hover:bg-opacity-60 max-h-104 cursor-pointer"
    >
      {/* banner */}
      <div className="bg-gray-300 outline-none border-none rounded-tl-xl rounded-tr-xl object-cover w-full h-3/5 relative overflow-hidden">
        {service.banner && (
          <img
            src={service.banner}
            alt="image"
            quality={100}
            loading="lazy"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      {/* date */}
      {service.banner && (
        <div className="absolute top-4 right-4 bg-secondary text-black flex flex-col justify-center items-center rounded-xl px-4 py-1 text-xs font-serif z-auto">
          {/* {service.date} */}
          <h3 className="text-2xl font-semibold">{service.dateNum}</h3>
          <p className="text-sm uppercase font-medium text-black text-opacity-75">
            {service.dateMonth}
          </p>
        </div>
      )}

      {/* info */}
      <div className="flex flex-col justify-between h-full items-end w-full">
        <div className="flex flex-col justify-start px-4 py-3 overflow-hidden">
          <div className="grid grid-cols-5 gap-x-2 mb-2 w-full">
            {/* title */}
            <h6 className="text-base col-span-3">{service.title}</h6>

            {/* duration */}
            <div className="bg-primary text-white rounded p-1 col-span-2 h-6">
              <p className="text-xs font-serif text-center">
                {service.banner
                  ? `${service.duration}`
                  : `${service.dateNum} ${service.dateMonth} @ ${service.duration}`}
              </p>
            </div>
          </div>

          {/* description */}
          <p className="text-xs text-black text-opacity-50 font-serif line-clamp-3 w-full">
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
  );
}

export default ServiceCard;
