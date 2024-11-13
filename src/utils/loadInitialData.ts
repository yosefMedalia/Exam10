import fs from 'fs';
import path from 'path';
import Missile from '../models/Missile';
import Organization from '../models/Organizasion';

export const loadInitialData = async () => {
  try {
    const missilesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../data/missiles.json'), 'utf-8')
    );
    const organizationsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../data/organizations.json'), 'utf-8')
    );

    // מחיקת נתונים קיימים כדי להימנע משכפולים
    await Missile.deleteMany({});
    await Organization.deleteMany({});

    // הכנסת הנתונים למסד הנתונים
    await Missile.insertMany(missilesData);
    await Organization.insertMany(organizationsData);

    console.log('Initial data loaded successfully');
  } catch (error) {
    console.error('Error loading initial data:', error);
  }
};
