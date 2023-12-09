import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';  // Import fileURLToPath
import Doctor from './models/doctor.js';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoDBURI = 'mongodb+srv://shettyaayu:CAw8PmtbGCabGGZN@cluster0.7yywkny.mongodb.net/MasterDb?retryWrites=true&w=majority';

mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Helper function to read DICOM image file
function readDicomImage(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return {
      data: data,
      contentType: 'application/dicom',
    };
  } catch (error) {
    console.error('Error reading DICOM image:', error);
    return null;
  }
}

// Sample data for seeding
const sampleDoctors = [
  {
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    contactNumber: '1234567890',
    address: '123 Main Street',
    location: 'City A',
    email: 'abc@example.com',
    scans_done: '50',
    scans_pending: '10',
    patients: [
      {
        patientName: 'Alice Johnson',
        patientLocation: 'Location 1',
        patientPhoneNumber: '1234567891',
        patientScansDone: true,
        remarks: 'Sample remark',
        scannedImages: "https://i.ibb.co/CVqgnq8/demo.jpg"
      },
      {
        patientName: 'Eva Davis',
        patientLocation: 'Location 5',
        patientPhoneNumber: '8765432111',
        patientScansDone: false,
        remarks: 'Yet another sample remark',
        scannedImages: "https://i.ibb.co/CVqgnq8/demo.jpg"
      },
      {
        patientName: 'Frank Miller',
        patientLocation: 'Location 6',
        patientPhoneNumber: '8765432112',
        patientScansDone: true,
        remarks: 'Sample remark for Frank',
        scannedImages: "https://i.ibb.co/CVqgnq8/demo.jpg"
      },
      {
        patientName: 'Grace Turner',
        patientLocation: 'Location 7',
        patientPhoneNumber: '8765432113',
        patientScansDone: false,
        remarks: 'Sample remark for Grace',
        scannedImages: "https://i.ibb.co/CVqgnq8/demo.jpg"
      },
      {
        patientName: 'Henry White',
        patientLocation: 'Location 8',
        patientPhoneNumber: '8765432114',
        patientScansDone: true,
        remarks: 'Sample remark for Henry',
        scannedImages: "https://i.ibb.co/CVqgnq8/demo.jpg"
      },
      // Add more patients as needed
    ],
  },
  // Add more doctors as needed
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Doctor.deleteMany({});

    // Insert sample data
    await Doctor.insertMany(sampleDoctors);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection after seeding
    mongoose.disconnect();
  }
}

seedDatabase();
