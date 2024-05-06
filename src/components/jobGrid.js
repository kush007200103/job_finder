import React, { useState, useEffect } from 'react';
import Cards from './cards';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import InfiniteScroll from 'react-infinite-scroll-component';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";


const removeDuplicates = (data) => {
  // Create a map to store unique job objects based on their jdUid
  const uniqueMap = new Map();

  // Iterate over the data array
  data.forEach(job => {
    // Check if the job object with the same jdUid already exists in the map
    if (!uniqueMap.has(job.jdUid)) {
      // If not, add it to the map
      uniqueMap.set(job.jdUid, job);
    }
  });

  // Return an array of unique job objects from the map
  return Array.from(uniqueMap.values());
};


const JobGrid = () => {
  const [jobData, setJobData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState({
    location: "",
    companyName: "",
    minExp: 0,
    techStack: "",
    Role: "",
    Minbase: 0
  });
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

const filterData = () => {
  if (jobData) {
    if (
      !filter.location &&
      !filter.companyName &&
      !filter.minExp &&
      !filter.techStack &&
      !filter.Role &&
      !filter.Minbase
    ) {
      // If all filters are empty, show all items
      setFilteredData(null);
      setFilterActive(false);
    } else {
      // Otherwise, apply the filtering logic
      const filtered = jobData.filter(job => {
        // Ensure job and its properties are defined before accessing them
        return (
          (!filter.location || (job.location && job.location.toLowerCase().includes(filter.location.toLowerCase()))) &&
          (!filter.companyName || (job.companyName && job.companyName.toLowerCase().includes(filter.companyName.toLowerCase()))) &&
          (!filter.minExp || (job.minExp !== undefined && job.minExp >= filter.minExp)) &&
          (!filter.techStack || (job.techStack && job.techStack.toLowerCase().includes(filter.techStack.toLowerCase()))) &&
          (!filter.Role || (job.jobRole && job.jobRole.toLowerCase().includes(filter.Role.toLowerCase()))) &&
          (!filter.Minbase || (job.minJdSalary !== undefined && job.minJdSalary >= filter.Minbase))
        );
      });

      // Remove duplicates from the filtered data
      const uniqueFilteredData = removeDuplicates(filtered);

      // Set the filtered data in the state
      setFilteredData(uniqueFilteredData);
      setFilterActive(true);
    }
  }
};


  useEffect(() => {
    filterData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.weekday.technology/adhoc/getSampleJdJSON`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setJobData(prevState => (prevState ? [...prevState, ...data.jdList] : data.jdList));
      setHasMore(data.jdList.length > 0);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  return (
    <Container maxWidth="#fff">
      <Box>
        <TextField label="Enter your Company" id="outlined-basic" variant="outlined" sx={{ marginLeft: 6, marginTop: 8 }} value={filter.companyName} onChange={(e) => { setFilter({ ...filter, companyName: e.target.value }) }} />
        <TextField label="Location" id="outlined-basic" variant="outlined" sx={{ marginLeft: 6, marginTop: 8 }} value={filter.location} onChange={(e) => { setFilter({ ...filter, location: e.target.value }) }} />
        <TextField label="Minimum Salary" id="outlined-basic" variant="outlined" sx={{ marginLeft: 6, marginTop: 8 }} value={filter.Minbase === 0 ? '' : filter.Minbase} onChange={(e) => { setFilter({ ...filter, Minbase: e.target.value }) }} />
        <TextField label="Role" id="outlined-basic" variant="outlined" sx={{ marginLeft: 6, marginTop: 8 }} value={filter.Role} onChange={(e) => { setFilter({ ...filter, Role: e.target.value }) }} />
        <TextField label="Min experience" id="outlined-basic" variant="outlined" sx={{ marginLeft: 6, marginTop: 8 }} value={filter.minExp === 0 ? '' : filter.minExp} onChange={(e) => { setFilter({ ...filter, minExp: e.target.value }) }} />
      </Box>

      <InfiniteScroll
        dataLength={filteredData ? filteredData.length : 0}
        next={fetchData}
        hasMore={hasMore}
        endMessage={<p>No more items to load</p>}
      >
        <Grid
          container
          spacing={{ xs: 3, sm: 6, md: 12 }}
          columns={{ xs: 3, sm: 6, md: 12 }}
          justifyContent="center"
          alignItems="center"
          sx={{ marginX: 'auto', paddingTop: 10 }}
        >
          {filterActive ? (
            filteredData &&
            filteredData.map((job, index) => (
              <Grid item key={index}>
                <Cards
                  key={job.jdUid}
                  companyName={job.companyName}
                  minExp={job.minExp}
                  maxExp={job.maxExp}
                  jobLogo={job.logoUrl}
                  jobLocation={job.location}
                  jobDescription={job.jobDetailsFromCompany}
                  jobTitle={job.jobRole}
                  jobmaxJdSalary={job.maxJdSalary}
                  jobminJdSalary={job.minJdSalary}
                />
              </Grid>
            ))
          ) : (
            jobData &&
            jobData.map((job, index) => (
              <Grid item key={index}>
                <Cards
                  key={job.jdUid}
                  companyName={job.companyName}
                  jobminExp={job.minExp}
                  jobmaxExp={job.maxExp}
                  jobLogo={job.logoUrl}
                  jobLocation={job.location}
                  jobDescription={job.jobDetailsFromCompany}
                  jobTitle={job.jobRole}
                  jobmaxJdSalary={job.maxJdSalary}
                  jobminJdSalary={job.minJdSalary}
                />
              </Grid>
            ))
          )}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};

export default JobGrid;
