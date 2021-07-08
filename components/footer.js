/*
 * File: footer.js                                                             *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 11:14:27 am                          *
 * -----                                                                       *
 * Last Modified: Thursday, June 17th 2021 2:47:03 pm                          *
 */

function Footer() {
  return (
    <div className="bg-black py-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col space-y-12 text-white">
        {/* health notice */}
        <div className="border border-red-500 bg-red-500 bg-opacity-20 pb-8 px-8">
          <h6 className="text-center font-serif uppercase font-semibold text-base my-4 md:my-8">
            Health Notice
          </h6>
          <p className="text-sm font-light">
            Any person who has had any context with known COVID-19 confirmed
            cases or who has flu symptoms or fever should STAY HOME and
            self-quarantine. High-risk individuals based on age or predisposed
            health conditions should be advised not to attend the in-person
            service. Prior to and following any in-person service, the facility
            will be sanitized. Attendees may be advised that, if they choose,
            they may wear masks and/or gloves. Attendees may be advised not to
            engage in hand shaking or other physical contact Hand sanitizers
            will be available throughtout the facility, and each person may be
            given a quirt of sanitizer or a sanitizer wipe upon entering Pews
            and designed sitting areas may be marked
          </p>
        </div>

        {/* footer grid */}
        <div className="grid grid-cols-2">
          {/* address */}
          <div className="flex flex-col">
            <h6 className="font-semibold">Vendor</h6>
            <p className="text-sm">33645 20th Avenue South</p>
            <p className="text-sm">Federal Way, WA 98003</p>
          </div>

          {/* contact */}
          <div className="flex flex-col">
            <h6 className="font-semibold">Contact Us</h6>
            <p className="text-sm">916-472-0847</p>
            <p className="text-sm">info@kingdomdomain.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
