import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import * as blobUtil from 'blob-util';


interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getUserEmail = () => {
    return localStorage.getItem('username');
  };

  useEffect(() => {

    const username = getUserEmail();
    let id = "6574164acdbfe9d857c5b38b"
    if ( username === "test@gmail.com"){
      id = "657416b45c5829891807e72b"
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/doctors/${id}`);

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setDoctorData(data.data.doctor);
        } else {
          console.error('Error fetching doctor data');
        }
      } catch (error) {
        console.error('Error fetching doctor data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    navigate('/dwv');
  };

  const handleViewDetails = (doctorId: any, patientId: any) => {
    navigate(`/dwv/${doctorId}/${patientId}`);
  };


  const handleDownloadReport = (index: number) => {
    const imageUrl = doctorData.patients[index].scannedImages;
    const fileName = `patient_${index + 1}_scan_image.jpeg`;
  
    console.log('first', imageUrl)
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, fileName);
      })
      .catch((error) => {
        console.error('Error fetching or saving the file:', error);
      });
  };

  const handleLogout = () => {
    // Clear user information from local storage
    localStorage.removeItem('username');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="dashboard">
      {loading ? (
           <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', marginTop: 10}}>
           <CircularProgress />
         </div>
      ) : (
        <>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h2>Hello, {doctorData?.name} ({doctorData?.specialty} Department)</h2>
  <button className="button secondary-button" onClick={handleLogout}>
    Logout
  </button>
</div>

          {/* First Row */}
          <div className="card-container">
            <div className="card blue-card">
              <h3 style={{ color: "#fff" }}>Summary</h3>
              <p style={{ color: "#fff" }}>Total Patients {doctorData?.patients.length}</p>
              <div className="action-buttons">
                <button onClick={handleButtonClick} className="button secondary-button">
                  Go to DwV Viewer
                </button>
              </div>
            </div>
            <div className="card">
              <div className="clinical-tests">
                <div>
                  <p>Scans Done</p>
                  <h3>{doctorData?.scans_done}</h3>
                </div>
                <div>
                  <p>Scans Pending</p>
                  <h3>{doctorData?.scans_pending}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="card progress-bar-card">
            <span>Patients List</span>
            <div className="card-container">
              {doctorData &&
                doctorData?.patients &&
                doctorData.patients.map((patient, index) => (
                  <Card key={index} className="card">
                    <CardContent>
                      <Typography variant="h6">{index + 1}. {patient.patientName}</Typography>
                      <Typography>Number: {patient.patientPhoneNumber}</Typography>
                      <Typography>Location: {patient.patientLocation}</Typography>
                      <Typography>Remarks: <code>{patient.remarks}</code></Typography>
                      <Typography>Scans Done: {patient.patientScansDone ? 'DONE' : 'PENDING'}</Typography>

                      {/* Add action buttons here */}
                      <div className="action-buttons">
                        <button
                          className="button primary-button"
                          onClick={() => handleViewDetails(doctorData._id, doctorData.patients[index]._id)}
                        >
                          View More
                        </button>

                        <button className="button secondary-button" onClick={() => handleDownloadReport(index)}>
                          Download Image
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
