import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, X } from "lucide-react"; // Import 'X' for cross button

function ProjectListing() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to track search input

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getProjects");
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    // Fetch the projects from the API when the component mounts
    fetchProjects();
  }, []);

  // Function to format date as "MMM-DD, YYYY"
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  
    // Remove the comma between the month and day to match the exact format "Jan-01, 2021"
    const [monthDay, year] = formattedDate.split(', ');
    const [month, day] = monthDay.split(' ');
  
    return `${month}-${day}, ${year}`;
  };

  // Clear the search input
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Function to filter projects based on search term
  const filteredProjects = projects.filter((project) => {
    // Convert project fields to lowercase for case-insensitive search
    const searchText = searchTerm.toLowerCase();

    return (
      project.theme.toLowerCase().includes(searchText) ||
      project.reason.toLowerCase().includes(searchText) ||
      project.type.toLowerCase().includes(searchText) ||
      project.division.toLowerCase().includes(searchText) ||
      project.category.toLowerCase().includes(searchText) ||
      project.priority.toLowerCase().includes(searchText) ||
      project.department.toLowerCase().includes(searchText) ||
      project.location.toLowerCase().includes(searchText) ||
      project.status.toLowerCase().includes(searchText)
    );
  });

const handleStatusChange= async (id,newStatus)=>{
  console.log("ID:",id);
  console.log("New Status:",newStatus);
try {
await axios.patch(`http://127.0.0.1:3000/api/updateStatus/${id}`,{status:newStatus});
fetchProjects();

} catch (error) {
  console.error("Error updating status:",error.message);
}
}



  return (
    <div className="container mx-auto h-[80%] relative">
      <div className="bg-white shadow-custom rounded-[10px]">
        <div className="flex items-center justify-between pl-10 pr-10 pt-10">
          <div className="relative border-b border-b-[#979797] flex items-center gap-2">
            <Search className="text-[#B9BCBF] w-[16px]" />
            <input
              type="text" // Text input for search
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              placeholder="Search"
              className="text-[#414950] text-[18px] leading-[22px] outline-none"
            />
            {searchTerm && (
              <X
                className="text-[#B9BCBF] w-[16px] cursor-pointer absolute right-0"
                onClick={clearSearch} // Clear search input on click
              />
            )}
          </div>
          <div className="flex justify-center items-center gap-1">
            <label htmlFor="sort" className="text-[16px]">Sort By:</label>
            <select name="sort" id="sort" className="text-[16px]">
              <option value="Priority">Priority</option>
            </select>
          </div>
        </div>
        <div className="py-4">
          <table className="min-w-full bg-white">
            <thead className="bg-[#EBF5FF]">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">Project Name</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">Reason</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">Type</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">Division</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">Category</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">Priority</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">Dept.</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">Location</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">Status</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    <div className="text-[#414950] text-[16px] font-bold">{project.theme}</div>
                    <div className="text-[14px] text-[#6B6B6B]">
                      {formatDate(project.startDate)} to {formatDate(project.endDate)}
                    </div>
                  </td>
                  <td className="px-[14px] text-[#3F3F3F]">{project.reason}</td>
                  <td className="px-[14px] text-[#3F3F3F]">{project.type}</td>
                  <td className="px-[14px] text-[#3F3F3F]">{project.division}</td>
                  <td className="px-[14px] text-[#3F3F3F]">{project.category}</td>
                  <td className="px-[14px] text-[#3F3F3F]">{project.priority}</td>
                  <td className="px-[14px] text-[#3F3F3F]">{project.department}</td>
                  <td className="px-[14px] text-[#3F3F3F]">{project.location}</td>
                  <td className="px-[14px] text-[#3F3F3F]">
                    <span className="text-[14px] font-bold">{project.status}</span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-[#025AAB] text-white px-3 py-1 rounded-[18px] mr-2 w-[65px] text-[14px]" onClick={()=>handleStatusChange(project._id,"Running")}>Start</button>
                    <button className="border border-[#025AAB] text-[#025AAB] px-3 py-1 rounded-[18px] w-[65px] text-[14px] mr-2" onClick={()=>handleStatusChange(project._id,"Closed")}>Close</button>
                    <button className="border border-[#025AAB] text-[#025AAB] px-3 py-1 rounded-[18px] w-[65px] text-[14px] mr-2" onClick={()=>handleStatusChange(project._id,"Cancelled")}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectListing;
