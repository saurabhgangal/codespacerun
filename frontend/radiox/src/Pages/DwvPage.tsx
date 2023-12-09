import React, { useState, useEffect } from 'react';
import { Typography, TextareaAutosize, Grid, Button, Paper, Box, Snackbar, CircularProgress } from '@mui/material';
import DwvComponent from '../DwvComponent';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DwvPage: React.FC = () => {
  const [doctorRemarks, setDoctorRemarks] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { doctorId, patientId } = useParams<{ doctorId: string; patientId: string }>();

  const handleRemarksChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDoctorRemarks(event.target.value);
  };

  const handlePostRemark = () => {
    // Make a PUT request to the API endpoint
    axios.put(`http://localhost:8000/doctors/${doctorId}/patients/${patientId}/remarks`, {
      remarks: doctorRemarks,
    })
      .then(response => {
        // Handle success
        console.log('Remark posted successfully:', response.data);
        setSnackbarOpen(true); // Open the snackbar
      })
      .catch(error => {
        // Handle error
        console.error('Error posting remark:', error);
      });
  };


  http://localhost:8000/info?doctorId=${doctorId}&patients=${patientId}

  useEffect(() => {
    // Fetch patient information using a GET request
    axios.get(`http://localhost:8000/doctors/${doctorId}/patients/${patientId}/info`)
      .then(response => {
        // Set the patient information in the state
        setDoctorRemarks(response.data.patientInfo.remarks);
        setPatientInfo(response.data.patientInfo);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching patient information:', error);
      })
      .finally(() => {
        // Set loading to false once the data is fetched
        setLoading(false);
      });
  }, [doctorId, patientId]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={2}>
      {/* DwvComponent or Image */}
      <Grid item xs={8}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
          <h3>&nbsp;Scanned Image of <u>{patientInfo.patientName}</u></h3>
            {patientInfo?.scannedImages ? (
              // Render image if scannedImages are available
              <img
                src={patientInfo?.scannedImages}
                alt="Scanned Image"
                style={{ width: '100%', height: '60%', objectFit: 'contain', marginTop:20 }}
              />
            ) : (
              // Render DWVComponent if scannedImages are not available
              <DwvComponent scannedImages={patientInfo?.scannedImages || []} />
            )}
          </>
        )}
      </Grid>

      {/* Remarks Section */}
      <Grid item xs={4}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: 85, height: '80vh', overflowY: 'auto' }}>
          {/* Display Patient Information */}
          {loading ? (
            <CircularProgress />
          ) : (
            <div>
              <Typography variant="h6" gutterBottom>
                Patient Information
              </Typography>
              <hr />
              <Typography>{`Name: ${patientInfo.patientName}`}</Typography>
              <Typography>{`Location: ${patientInfo.patientLocation}`}</Typography>
              <Typography>{`Phone Number: ${patientInfo.patientPhoneNumber}`}</Typography>
              <Typography>{`Scans Done: ${patientInfo.patientScansDone ? 'Yes' : 'No'}`}</Typography>
            </div>
          )}
          <Typography variant="h6" gutterBottom>
            Doctor's Remarks
          </Typography>
          <TextareaAutosize
            rowsMin={8}
            style={{ width: '100%', minHeight: '150px', marginBottom: '16px', padding: 20 }}
            value={doctorRemarks}
            onChange={handleRemarksChange}
            placeholder="Enter your remarks here..."
          />
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handlePostRemark}>
              Post Remark
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Remark posted successfully!"
      />
    </Grid>
  );
};

export default DwvPage;
