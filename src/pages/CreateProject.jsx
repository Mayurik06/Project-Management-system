import React, { useState } from "react";
import axios from "axios";

const options = {
  reason: [
    { value: "Business", label: "For Business" },
    { value: "Dealership", label: "For Dealership" },
    { value: "Transport", label: "For Transpor" },
  ],
  type: [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
    { value: "Vendor", label: "Vendor" },
  ],
  division: [
    { value: "Filters", label: "Filters" },
    { value: "Compressor", label: "Compressor" },
    { value: "Pumps", label: "Pumps" },
    { value: "Glass", label: "Glass" },
    { value: "Water Heater", label: "Water Heater" },
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
    { value: "Strategy", label: "Strategy" },
    { value: "Finance", label: "Finance" },
    { value: "Quality", label: "Quality" },
    { value: "Maintenance", label: "Stores" },

  ],
  location: [
    { value: "Pune", label: "Pune" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
  ],
};

function CreateProject() {
  const [theme, setTheme] = useState("");
  const [themeError, setThemeError] = useState("");
  const[dateError,setDateError]=useState("");
  const [formData, setFormData] = useState({
    reason: "",
    type: "",
    division: "",
    category: "",
    priority: "",
    department: "",
    startDate: "",
    endDate: "",
    location: "",
    status: "Registered",
  });

  const optionKeys = Object.keys(options).slice(0, 6);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!theme) {
      setThemeError("Theme is required");
      return;
    }

const newStartDate = new Date(formData.startDate);
const newEndDate = new Date(formData.endDate);

    if (newStartDate > newEndDate) {
      setDateError('End date should be greater than start date');
      return;
    }

    // Prepare the data for submission
    const projectData = {
      theme,
      ...formData,
    };
console.log(projectData);
    try {
      // Send the project data to your API
      const response = await axios.post("http://127.0.0.1:3000/api/createProject", projectData);
      console.log("Project created successfully:",response.data);
      // Reset form after successful submission
      setTheme("");
      setFormData({
        reason: "",
        type: "",
        division: "",
        category: "",
        priority: "",
        department: "",
        location: "",
        startDate: "",
        endDate: "",
      });
      setThemeError(""); // Reset theme error
    } catch (error) {
      console.error("Error creating project:", error.response.data);
      // Handle errors appropriately
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-[10px] shadow-custom relative h-screen"
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="theme"
          className={`text-sm leading-[19px] ${themeError ? "text-red-500" : "text-[#767676]"}`}
        >
          Theme
        </label>
        <input
          type="text"
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className={`border w-full md:w-[60%] h-[70px] rounded-[6px] outline-none text-[16px] p-4 ${themeError ? "border-red-500" : "border-[#979797]"}`}
          placeholder="Enter theme here"
        />
      <span className="text-red-500 text-xs text-[12px] h-[14px]">{themeError}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:mt-10 mt-2 md:w-[85%]">
        {optionKeys.map((key) => (
          <div key={key} className="flex flex-col gap-1">
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
                onChange={handleInputChange}
                className="w-full text-[16px] leading-[22px] text-[#3F3F3F] outline-none"
              >
                <option value="" selected disabled>Select {key}</option>
                {options[key].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label
            htmlFor="startDate"
            className="text-[#767676] text-sm leading-[19px]"
          >
            Start Date as per Project Plan
          </label>
          <div className="border border-[#979797] py-[13px] px-4 rounded-[6px]">
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleInputChange}
              className="w-full text-[16px] leading-[22px] text-[#3F3F3F] outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="endDate"
            className={` text-sm leading-[19px] ${dateError? 'text-red-500':'text-[#767676]'}`}
          >
            End Date as per Project Plan
          </label>
          <div className={`border py-[13px] px-4 rounded-[6px] ${dateError? 'border-red-500':'border-[#979797]'}`}>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleInputChange}
              className="w-full text-[16px] leading-[22px] text-[#3F3F3F] outline-none"
            />
            
          </div>
          {dateError && <span className="text-red-500 text-xs">{dateError}</span>}
        </div>

        <div className="flex flex-col gap-1">
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
              onChange={handleInputChange}
              className="w-full text-[16px] leading-[22px] text-[#3F3F3F] outline-none"
            >
              <option value="">Select Location</option>
              {options.location.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 flex gap-1 items-center md:mt-2">
            <label htmlFor="status" className="text-[#767676] text-sm leading-[19px]">Status:</label>
            <input type="text" id="status" value="Registered" className="text-[16px] leading-[22px] text-[#3F3F3F] font-bold outline-none" readOnly />
          </div>
        </div>
      </div>

      <div className="text-center mt-4 md:absolute md:top-0 md:right-8">
        <button className="bg-[#025AAB] rounded-[18px] text-[16px] leading-[22px] text-white px-8 py-[7px]">
          Save Project
        </button>
      </div>
    </form>
  );
}

export default CreateProject;
