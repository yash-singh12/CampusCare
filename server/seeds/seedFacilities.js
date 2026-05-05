import connectDB from '../config/mongodb.js';
import { Facility } from '../config/schemas.js';

const seedFacilities = async () => {
  try {
    await connectDB();

    // Check if facilities already exist
    const existingFacilities = await Facility.countDocuments();
    if (existingFacilities > 0) {
      console.log(`${existingFacilities} facilities already exist in the database.`);
      process.exit(0);
    }

    const facilities = [
      {
        facility_id: "79439ae2-5361-4332-9832-d1569aafb861",
        name: "Hygiene Station",
        building: "Sports Complex",
        floor: "1F",
        room_number: null
      },
      {
        facility_id: "8c53dd4e-8d97-4b1f-885f-76078bf9fac6",
        name: "Girls' Washroom",
        building: "Main Block",
        floor: "1F",
        room_number: null
      },
      {
        facility_id: "e76dbc24-c029-4ed6-8a5b-86e7c8ef95ce",
        name: "Sanitary Pad Dispenser",
        building: "Library",
        floor: "Ground",
        room_number: null
      }
    ];

    await Facility.insertMany(facilities);
    console.log('Facilities seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding facilities:', error);
    process.exit(1);
  }
};

seedFacilities();
