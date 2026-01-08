import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/user.service'; 
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { User as UserIcon, Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form Data States
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: ''
  });

  // Image Handling
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Load User Data when page opens
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      });
      setPreview(user.avatar || null);
    }
  }, [user]);

  // Handle Image Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); 
    }
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('firstname', formData.firstname);
      data.append('lastname', formData.lastname);
      
      if (file) {
        data.append('avatar', file); 
      }

      await userService.update(data); // Backend Update
      await refreshProfile(); // Navbar Update
      
      alert("Profile Updated Successfully! 🎉");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 max-w-2xl mx-auto">
      
      {/* Back Button */}
      <button onClick={() => navigate('/home')} className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">Edit Profile</h1>
        <p className="text-slate-500 text-center mb-8">Update your personal details</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg ring-4 ring-slate-50">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <UserIcon className="w-16 h-16" />
                  </div>
                )}
              </div>
              
              {/* Overlay with Camera Icon */}
              <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                <Camera className="w-8 h-8 text-white drop-shadow-md" />
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            <p className="text-xs text-slate-400 mt-3 uppercase tracking-wide font-semibold">Change Photo</p>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="First Name"
              value={formData.firstname}
              onChange={(e) => setFormData({...formData, firstname: e.target.value})}
            />
            <Input 
              label="Last Name"
              value={formData.lastname}
              onChange={(e) => setFormData({...formData, lastname: e.target.value})}
            />
          </div>

          <Input 
            label="Email Address"
            value={formData.email}
            disabled
            className="bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed"
          />

          <Button type="submit" className="w-full py-3 text-lg" isLoading={loading}>
            <Save className="w-5 h-5 mr-2" /> Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};