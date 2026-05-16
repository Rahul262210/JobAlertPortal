import { supabase } from '../config/supabase.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

// Default admin credentials (used only when the admins table is empty)
const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
  password: process.env.ADMIN_PASSWORD || 'admin123',
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Get admin from database
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(admin.id);

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { adminId } = req.admin;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters long' });
    }

    const { data: admin, error: findError } = await supabase
      .from('admins')
      .select('*')
      .eq('id', adminId)
      .single();

    if (findError || !admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isCurrentPasswordValid = await comparePassword(currentPassword, admin.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await hashPassword(newPassword);

    const { error: updateError } = await supabase
      .from('admins')
      .update({ password: hashedPassword })
      .eq('id', adminId);

    if (updateError) {
      return res.status(400).json({ message: updateError.message });
    }

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};

// Seed default admin (call this once during setup)
export const seedAdmin = async () => {
  try {
    // Check whether any admin already exists
    const { data: existingAdmins, error: lookupError } = await supabase
      .from('admins')
      .select('id')
      .limit(1);

    if (lookupError) {
      console.error('Error checking admins:', lookupError);
      return;
    }

    if (existingAdmins?.length) {
      console.log('Admin already exists');
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(DEFAULT_ADMIN.password);

    // Insert default admin
    const { data, error } = await supabase
      .from('admins')
      .insert([
        {
          email: DEFAULT_ADMIN.email,
          password: hashedPassword,
        },
      ]);

    if (error) {
      console.error('Error seeding admin:', error);
      return;
    }

    console.log('Default admin created successfully');
    console.log('Email:', DEFAULT_ADMIN.email);
    console.log('Password:', DEFAULT_ADMIN.password);
  } catch (error) {
    console.error('Error in seedAdmin:', error);
  }
};
