import React from "react";

const options = {
  reason: [
    { value: "Business", label: "For Business" },
    { value: "Dealership", label: "Personal Development" },
    { value: "Transport", label: "Client Project" },
  ],
  type: [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
    { value: "Vendor", label: "Research" },
  ],
  category: [
    { value: "Quality A", label: "Quality A" },
    { value: "Quality B", label: "Quality B" },
    { value: "Quality C", label: "Quality C" },
    { value: "Quality D", label: "Quality D" },
  ],
  priority: [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ],
  department: [
    { value: "Stratergy", label: "Stratergy" },
    { value: "Finance", label: "Finance" },
    { value: "Quality", label: "Quality" },
  ],
  location: [
    { value: "Pune", label: "Pune" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
  ],
};

function Form() {
  const optionKeys = Object.keys(options).slice(0, 6);

  return (
    <>
      <form
        action=""
        className="p-6 bg-white rounded-[10px] shadow-custom relative"
      >
        <input
          type="text"
          placeholder="Enter text here"
          className="border w-full md:w-[714px] h-[70px] rounded-[6px] border-[#979797] text-[16px] p-4"
        />

        <div className="grid md:grid-cols-3 gap-4 md:mt-12 mt-2">
          {optionKeys.map((key) => (
            <div key={key} className="flex flex-col gap-1 md:w-[337px]">
              <label
                htmlFor={key}
                className="text-[#767676] text-sm leading-[19px]"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <div className="border border-[#979797] py-[13px] px-4 rounded-[6px]">
                <select
                  name={key}
                  id={key}
                  className="w-full text-[16px] leading-[22px] text-[#3F3F3F]"
                >
                  {options[key].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-1 md:w-[337px]">
            <label
              htmlFor="startDate"
              className="text-[#767676] text-sm leading-[19px]"
            >
              Start Date
            </label>
            <div className="border border-[#979797] py-[13px] px-4 rounded-[6px]">
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="w-full text-[16px] leading-[22px] text-[#3F3F3F] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 md:w-[337px]">
            <label
              htmlFor="endDate"
              className="text-[#767676] text-sm leading-[19px]"
            >
              End Date
            </label>
            <div className="border border-[#979797] py-[13px] px-4 rounded-[6px]">
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="w-full text-[16px] leading-[22px] text-[#3F3F3F] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 md:w-[337px]">
            <label
              htmlFor="location"
              className="text-[#767676] text-sm leading-[19px]"
            >
              Location
            </label>
            <div className="border border-[#979797] py-[13px] px-4 rounded-[6px]">
              <select
                name="location"
                id="location"
                className="w-full text-[16px] leading-[22px] text-[#3F3F3F] outline-none"
              >
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="md:col-span-3 flex gap-1 items-center md:mt-2">
              <label htmlFor="status" className="text-[#767676] text-sm leading-[19px]">Status:</label>
              <input type="text" id="status" value="Registered" className="text-[16px] leading-[22px] text-[#3F3F3F] font-bold" />
            </div>
          </div>
        </div>

        <div className="text-center mt-4 md:absolute md:top-0 md:right-8">
          <button className="bg-[#025AAB] rounded-[18px] text-[16px] leading-[22px] text-white px-8 py-[7px]">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
