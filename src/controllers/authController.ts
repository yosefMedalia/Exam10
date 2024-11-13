import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Organization from '../models/Organizasion';
import Missile from '../models/Missile';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// רישום משתמש חדש
export const register = async (req: Request, res: Response) => {
  const { username, password, organization, area } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'שם משתמש כבר קיים' });
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const specificOrganization = await Organization.findOne({ name: organization });
    if (!specificOrganization) {
       res.status(400).json({ message: 'הארגון לא נמצא' });
       return
    }

    const specificMissiles = await Promise.all(specificOrganization.resources.map(async (missile: any) => {
      const missileObject = await Missile.findOne({ name: missile.name });
      if (missileObject) {
        missileObject.amount = missile.amount; 
        return missileObject;
      }
    }));

    const newUser = new User({
      username,
      password: hashedPassword,
      organization,
      area,
      missiles: specificMissiles.filter(Boolean), 
    });

    await newUser.save();
    res.status(201).json({ message: 'המשתמש נוצר בהצלחה',  newUser });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'שגיאה ברישום המשתמש' });
  }
};


//התחברות משתמש
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
       res.status(400).json({ message: 'שם משתמש או סיסמה לא תקינים' });
       return
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       res.status(400).json({ message: 'שם משתמש או סיסמה לא תקינים' });
       return
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, organization: user.organization, area: user.area },
      JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({
      user: { id: user._id, username: user.username, organization: user.organization, area: user.area },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'שגיאה בהתחברות' });
  }
};









