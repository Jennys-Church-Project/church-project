/*
 * File: section.header.js                                                     *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 12:09:32 pm                          *
 * -----                                                                       *
 * Last Modified: Friday, June 11th 2021 6:53:58 am                            *
 */

function SectionHeader(props) {
  return <div className="text-center font-serif uppercase font-semibold text-base my-4 md:my-8">
      <h6>{props.title}</h6>
  </div>;
}

export default SectionHeader;
