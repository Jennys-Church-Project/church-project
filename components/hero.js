/*
 * File: hero.js                                                               *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 11:04:26 am                          *
 * -----                                                                       *
 * Last Modified: Thursday, June 17th 2021 7:21:07 pm                          *
 */

import { kAppName } from "../utils/constants";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  var timestamp = new Date();

  return (
    <section className="w-screen overflow-x-hidden flex flex-col items-center max-w-3xl py-16 mx-auto mt-8 md:max-w-2xl">
      {/* top */}
      <div className="flex justify-between items-center w-full px-8 max-w-xl mx-auto">
        <h6 className="font-serif uppercase text-sm">Accra, GH</h6>
        <h3 className="font-serif font-semibold text-2xl">MMXXI</h3>
        <h6 className="font-serif text-sm">
          Est. {timestamp.toLocaleDateString()}
        </h6>
      </div>

      {/* middle */}
      <div className="flex flex-col items-center text-center pt-7 px-8 space-y-6 lg:space-y-8">
        <h1 className="text-5xl lg:text-8xl font-bold uppercase">{kAppName}</h1>
        <p className="font-serif w-full md:w-2/3">
          You cannot touch on the greatness of God without His Glory
          manifesting. This is your time
        </p>
      </div>

      {/* button */}
      <Link href="/register">
        <div className="text-center cursor-pointer mt-8">
          <button className="border-black border-b-2 font-semibold text-lg">
            Register
          </button>
        </div>
      </Link>

      {/* image */}
      <img src="./worship.jpg" className="cover__image cover__image_max my-8" />
    </section>
  );
}

export default Hero;
