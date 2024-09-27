import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import axios from 'axios';
import BarsDataset from '../Components/BarDataset';


function Dashboard() {
const [projectData,setProjectData]=useState({
    totalProjects: 0,
    totalClosedProjects: 0,
    totalRunningProjects: 0,
    totalDelayedRunningProjects: 0,
    totalCancelledProjects: 0,
});

const fetchProjectData=async()=>{
try {
  const response = await axios.get('http://localhost:3000/api/getDetailProject');
  setProjectData(response.data);

} catch (error) {
  console.log('Error fetching project details', error.message);
}
}

useEffect(()=>{
  fetchProjectData();
},[]);


  return (
    <div className='absolute w-[93%]'>
     <div className='grid grid-cols-5 gap-4'>
<Card heading="Total Projects" counter={projectData.totalProjects}/>
<Card heading="Closed Projects" counter={projectData.totalClosedProjects}/>
<Card heading="Running Projects" counter={projectData.totalRunningProjects}/>
<Card heading="Delayed Running Projects" counter={projectData.totalDelayedRunningProjects}/>
<Card heading="Cancelled Projects" counter={projectData.totalCancelledProjects}/>
     </div>

<div>
<BarsDataset/>
</div>

    </div>
  )
}

export default Dashboard
