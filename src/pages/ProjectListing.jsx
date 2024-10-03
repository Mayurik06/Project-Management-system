import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, X } from "lucide-react"; // Import 'X' for cross button
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const style = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function ProjectListing() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const projectsPerPage = 6;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getProjects");
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to format date
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    const [monthDay, year] = formattedDate.split(", ");
    const [month, day] = monthDay.split(" ");

    return `${month}-${day}, ${year}`;
  };

  //clear the searchbar
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Function to filter projects based on search term
  const filteredProjects = projects
    .filter((project) => {
      const searchText = searchTerm.toLowerCase();

      return (
        project.theme?.toLowerCase().includes(searchText) ||
        project.reason?.toLowerCase().includes(searchText) ||
        project.type?.toLowerCase().includes(searchText) ||
        project.division?.toLowerCase().includes(searchText) ||
        project.category?.toLowerCase().includes(searchText) ||
        project.priority?.toLowerCase().includes(searchText) ||
        project.department?.toLowerCase().includes(searchText) ||
        project.location?.toLowerCase().includes(searchText) ||
        project.status?.toLowerCase().includes(searchText)
      );
    })
    // Apply sorting
    .sort((a, b) => {
      if (sortField) {
        console.log("Sort Field:", sortField);
        return a[sortField]
          ?.toLowerCase()
          .localeCompare(b[sortField]?.toLowerCase());
      }
      return 0;
    });

  // Get current projects for the current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:3000/api/updateStatus/${id}`, {
        status: newStatus,
      });
      fetchProjects();
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  // Handle sort field change
  const handleSortChange = (event) => {
    if (event.target.value === "recent") {
      return;
    }
    setSortField(event.target.value);
  };


  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768); // Consider `md` as 768px
  };

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <div className="relative p-4 w-full pb-20">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="relative border-b border-b-[#979797] flex items-center gap-2 flex-1 mr-6">
                {searchTerm ? null : (
                  <Search className="text-[#B9BCBF] w-[16px]" />
                )}

                <input
                  type="text" // Text input for search
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                  placeholder="Search"
                  className={`text-[#414950] bg-transparent flex-1 text-[18px] leading-[22px] outline-none ${
                    searchTerm ? "pl-4" : "pl-1"
                  }`}
                />
                {searchTerm && (
                  <X
                    className="text-[#979797] w-[16px] cursor-pointer absolute right-0"
                    onClick={clearSearch} // Clear search input on click
                  />
                )}
              </div>

              <img src="sorting.svg" alt="" onClick={handleOpen} />
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <div className="flex items-center justify-between">
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      <p className="font-bold"> Sort Projects By</p>
                    </Typography>
                    <div>
                      <X onClick={handleClose} />
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-6 items-start">
                    <button value="priority" onClick={handleSortChange}>
                      Priority
                    </button>
                    <button value="status" onClick={handleSortChange}>
                      Status
                    </button>
                    <button value="recent" onClick={handleSortChange}>
                      Recently Modified
                    </button>
                    <button value="startDate" onClick={handleSortChange}>
                      Start Date
                    </button>
                    <button value="endDate" onClick={handleSortChange}>
                      End Date
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>

            <div>
              {currentProjects.map((project, index) => (
                <div className="my-4 bg-white p-2 rounded-[10px]" key={index}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#414950] text-[16px] font-bold">
                        {project.theme}
                      </p>
                      <p className="text-[14px] text-[#6B6B6B]">
                        {formatDate(project.startDate)} to{" "}
                        {formatDate(project.endDate)}
                      </p>
                    </div>

                    <div>
                      <p className="px-[14px] text-[#00284C] text-[14px] font-bold">
                        {project.status}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div>
                      <p className="text-[#414950] text-[14px]">
                        <span className="text-[#5d5d5d]">Reason:</span>{" "}
                        {project.reason}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-[#414950] text-[14px]">
                        <span className="text-[#5d5d5d]">Div:</span>{" "}
                        {project.division}
                      </p>
                      <div className="flex items-center flex-col">
                        <div className="w-[5px] h-[5px] bg-[#96A1A9] rounded-full"></div>
                      </div>
                      <p className="text-[#414950] text-[14px]">
                        <span className="text-[#5d5d5d]">Dept:</span>{" "}
                        {project.department}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#414950] text-[14px]">
                      <span className="text-[#5d5d5d]">Location:</span>{" "}
                      {project.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#414950] text-[14px]">
                      <span className="text-[#5d5d5d]">Priority:</span>{" "}
                      {project.priority}
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      className="bg-[#025AAB] text-white px-3 py-1 rounded-[18px] mr-2 w-[88px] text-[16px]"
                      onClick={() => handleStatusChange(project._id, "Running")}
                    >
                      Start
                    </button>
                    <button
                      className="border border-[#025AAB] text-[#025AAB] px-3 py-1 rounded-[18px] w-[88px] text-[16px] mr-2"
                      onClick={() => handleStatusChange(project._id, "Closed")}
                    >
                      Close
                    </button>
                    <button
                      className="border border-[#025AAB] text-[#025AAB] px-3 py-1 rounded-[18px] w-[88px] text-[16px]"
                      onClick={() =>
                        handleStatusChange(project._id, "Cancelled")
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto relative">
          <div className="bg-white shadow-custom rounded-[10px]">
            <div className="flex items-center justify-between pl-10 pr-10 pt-10">
              <div className="relative border-b border-b-[#979797] flex items-center gap-2">
                {searchTerm ? null : (
                  <Search className="text-[#B9BCBF] w-[16px]" />
                )}

                <input
                  type="text" // Text input for search
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                  placeholder="Search"
                  className={`text-[#414950] text-[18px] leading-[22px] outline-none ${
                    searchTerm ? "pl-4" : "pl-1"
                  }`}
                />
                {searchTerm && (
                  <X
                    className="text-[#979797] w-[16px] cursor-pointer absolute right-0"
                    onClick={clearSearch} // Clear search input on click
                  />
                )}
              </div>
              <div className="flex justify-center items-center gap-1">
                <label htmlFor="sort" className="text-[16px] text-[#96A1A9]">
                  Sort By:
                </label>
                <select
                  name="sort"
                  id="sort"
                  className="text-[16px] outline-none"
                  onChange={handleSortChange} // Update sorting field on change
                  value={sortField}
                >
                  <option value="priority">Priority</option>
                  <option value="theme">Project Name</option>
                  <option value="reason">Reason</option>
                  <option value="type">Type</option>
                  <option value="division">Division</option>
                  <option value="category">Category</option>
                  <option value="department">Department</option>
                  <option value="location">Location</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
            <div className="py-4">
              <table className="min-w-full bg-white">
                <thead className="bg-[#EBF5FF]">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">
                      Project Name
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">
                      Reason
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">
                      Type
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">
                      Division
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">
                      Category
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">
                      Priority
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">
                      Dept.
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">
                      Location
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">
                      Status
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-[#3F3F3F]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentProjects.map((project, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">
                        <div className="text-[#414950] text-[16px] font-bold">
                          {project.theme}
                        </div>
                        <div className="text-[14px] text-[#6B6B6B]">
                          {formatDate(project.startDate)} to{" "}
                          {formatDate(project.endDate)}
                        </div>
                      </td>
                      <td className="px-[14px] text-[#3F3F3F]">
                        {project.reason}
                      </td>
                      <td className="px-[14px] text-[#3F3F3F]">
                        {project.type}
                      </td>
                      <td className="px-[14px] text-[#3F3F3F]">
                        {project.division}
                      </td>
                      <td className="px-[14px] text-[#3F3F3F]">
                        {project.category}
                      </td>
                      <td className="px-[14px] text-[#3F3F3F]">
                        {project.priority}
                      </td>
                      <td className="px-[14px] text-[#3F3F3F]">
                        {project.department}
                      </td>
                      <td className="px-[14px] text-[#3F3F3F]">
                        {project.location}
                      </td>
                      <td className="px-[14px] text-[#00284C] font-bold">
                        {project.status}
                      </td>
                      <td className="px-[14px]">
                        <button
                          className="bg-[#025AAB] text-white px-3 py-1 rounded-[18px] mr-2 w-[65px] text-[14px]"
                          onClick={() =>
                            handleStatusChange(project._id, "Running")
                          }
                        >
                          Start
                        </button>
                        <button
                          className="border border-[#025AAB] text-[#025AAB] px-3 py-1 rounded-[18px] w-[65px] text-[14px] mr-2"
                          onClick={() =>
                            handleStatusChange(project._id, "Closed")
                          }
                        >
                          Close
                        </button>
                        <button
                          className="border border-[#025AAB] text-[#025AAB] px-3 py-1 rounded-[18px] w-[65px] text-[14px]"
                          onClick={() =>
                            handleStatusChange(project._id, "Cancelled")
                          }
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center items-center py-2">
          <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIosIcon, next: ArrowForwardIosIcon }}
            {...item}
            sx={{
           color:'#3F3F3F' ,
              '&.Mui-selected': {
                backgroundColor: '#0CC9E8', 
                color: 'white',          // Text color for the selected page
              },
            }}
          />
        )}
      />
    </Stack>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectListing;
