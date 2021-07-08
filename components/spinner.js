/*
 * File: spinner.js                                                            *
 * Project: church-project                                                     *
 * Created Date: Friday, July 2nd 2021, 5:04:13 am                             *
 * -----                                                                       *
 * Last Modified: Friday, July 2nd 2021 5:04:14 am                             *
 */

function Spinner({ size }) {
  return (
    <div className="absolute inset-0 h-full w-full z-50 flex justify-center items-center">
      <div className={`animate-spin rounded-full h-${size || "20"} w-${size || "20"} border-t-2 border-b-2 border-primary`}></div>
    </div>
  );
}

export default Spinner;
