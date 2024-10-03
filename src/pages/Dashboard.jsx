import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import axios from "axios";
import DepartmentSuccessChart from "../Components/DepartmentSuccessChart";

function Dashboard() {
  const [projectData, setProjectData] = useState({
    totalProjects: 0,
    totalClosedProjects: 0,
    totalRunningProjects: 0,
    totalDelayedRunningProjects: 0,
    totalCancelledProjects: 0,
  });

  const [isMobile, setIsMobile] = useState(false);

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getDetailProject"
      );
      setProjectData(response.data);
    } catch (error) {
      console.log("Error fetching project details", error.message);
    }
  };

  // Check if the screen size is mobile or desktop
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768); // Consider `md` as 768px
  };

  useEffect(() => {
    fetchProjectData();
    checkScreenSize(); // Check on initial render

    // Listen for window resize events
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="absolute md:w-[93%] w-full p-4 md:p-0">
      <div className="flex gap-4 overflow-x-auto w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <Card heading="Total Projects" counter={projectData.totalProjects} />
        <Card heading="Closed" counter={projectData.totalClosedProjects} />
        <Card heading="Running" counter={projectData.totalRunningProjects} />

        <Card
          heading="Closure Delay"
          counter={projectData.totalDelayedRunningProjects}
        />
        <Card
          heading="Cancelled"
          counter={projectData.totalCancelledProjects}
        />
      </div>

      <div className="md:w-[50%] md:mt-10 mt-4">
        <DepartmentSuccessChart />
      </div>
    </div>
  );
}

export default Dashboard;
