import Organization from '../models/Organizasion';
import Missile from '../models/Missile';
import missilesData from '../../data/missiles.json';
import organizationsData from '../../data/organizations.json';


export const loadInitialData = async () => {
  try {
    // טעינת ארגונים אם אין נתונים קיימים
    const orgCount = await Organization.countDocuments();
    if (orgCount === 0) {
      await Organization.insertMany(organizationsData);
      console.log('Organizations data loaded');
    }

    // טעינת טילים אם אין נתונים קיימים
    const missileCount = await Missile.countDocuments();
    if (missileCount === 0) {
      await Missile.insertMany(missilesData);
      console.log('Missiles data loaded');
    }
  } catch (error) {
    console.error('Error loading initial data:', error);
  }
};


import fs from 'fs';
import path from 'path';

//טעינה של נתוני הטילים

export const loadMissilesData = () => {
  const filePath = path.join(__dirname, '../../data/missiles.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
};

