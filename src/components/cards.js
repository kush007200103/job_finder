import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
function JobCard({
  companyName,
  minExp,
  maxExp,
  jobLogo,
  jobLocation,
  jobDescription,
  jobTitle,
  postedDays,
  jobmaxJdSalary,
  jobminJdSalary,
}) {
  return (
    <Card sx={{ maxWidth: 390 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography></Typography>
          <Chip
            label="Posted xyz days"
            size="small"
            sx={{ backgroundColor: green[500], color: "#fff" }}
          />
        </Box>

        <Box display="flex" alignItems="center">
          {" "}
          {/* Nested Box for job title and company name */}
          <Avatar src={jobLogo} alt={capitalizeFirstLetter(companyName)} />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ ml: "10px" }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {capitalizeFirstLetter(companyName)}
            </Typography>

            <Typography variant="h6" sx={{ mb: 1.0 }} component="div">
              {capitalizeFirstLetter(jobTitle)}
            </Typography>
            <Typography variant="subtitle2" sx={{ my: 1.0 }} color="InfoText">
              {capitalizeFirstLetter(jobLocation)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2">
          <span style={{ fontWeight: "bold" }}>Estimated Salary:</span>{" "}
          {jobminJdSalary ? jobminJdSalary / 10 : "0"} - {jobmaxJdSalary / 10}{" "}
          LPA
        </Typography>

        <Typography variant="body2">
          <Typography style={{ fontSize: "1.2rem" }}>
            <span style={{ fontWeight: "bold" }}>About Company :</span>
          </Typography>

          <span style={{ fontWeight: "bold" }}>About Us </span>
          <br />
          {jobDescription}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={2}
        >
          <Typography variant="body2" color="text.secondary">
            Minimum Experience: <br />
            <span style={{ fontWeight: "bold" }}>
              {minExp !== null && minExp !== undefined ? minExp : 0} years
            </span>
          </Typography>
        </Box>
      </CardContent>

      {/* <Box display="flex" justifyContent="center" mt={2}> mt={2} adds margin at the top */}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            "& button": {
              m: 1,
              width: "350px",
              height: "60px",
              borderRadius: "15px",
            },
          }}
        >
          <div>
            <Button variant="contained" size="large" color="primary">
              <LockOpenIcon /> Apply Now
            </Button>
          </div>
          <div>
            <Button variant="contained" size="large" color="secondary">
              Unlock referral now
            </Button>
          </div>
        </Box>
      </Box>

      {/* <Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LockOpenIcon />}
          sx={{
            borderRadius: "15px", // Rounded corners
            padding: "15px 87px", // Larger padding for bigger size
            textTransform: "none", // Prevents uppercasing text
            fontSize: "18px", // Larger font size
        

      </Box> */}
    </Card>
  );
}

export default JobCard;
