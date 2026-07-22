import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Edit, LogOut, Eye, EyeOff, X, Loader2, Camera, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { logOut, selectCurrentUser, updateUser } from '@/features/auth/store/authSlice';
import { useUpdatePasswordMutation } from '@/features/auth/api/authApi';
import { useUpdateUserDetailsByIdMutation } from '@/features/ccs/api/dashboardApi';

export default function CcsProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [localProfilePic, setLocalProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    dob: ''
  });

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalProfilePic(url);
    }
  };

  const [updatePassword, { isLoading: isUpdating }] = useUpdatePasswordMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  
  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  const openPasswordModal = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPwError('');
    setPwSuccess(false);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');

    if (newPassword.length < 8) {
      setPwError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('New password and confirm password do not match.');
      return;
    }

    try {
      const result = await updatePassword({
        old_password: oldPassword,
        new_password: newPassword,
      }).unwrap();

      const isSuccess = result?.success !== false && result?.status !== 'error';
      if (isSuccess) {
        setPwSuccess(true);
        setTimeout(() => setShowPasswordModal(false), 1500);
      } else {
        setPwError(result?.message || 'Failed to update password. Please try again.');
      }
    } catch (err: any) {
      const msg = err?.data?.message || err?.data?.error || err?.message || 'Failed to update password.';
      setPwError(msg);
    }
  };

  const user: any = { ...(currentUser || {}) };
  const fullName = user.name || user.firstName || (user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : '');
  const firstName = (fullName ? fullName.split(' ')[0] : '') || 'N/A';
  const lastName = (fullName ? fullName.split(' ').slice(1).join(' ') : '') || 'N/A';
  const email = user.email || user.login_id || '';
  const phone = user.phone || user.mobile_number || 'N/A';
  const dob = user.dob || user.date_of_birth || 'N/A';
  const role = user.role || currentUser?.role || '';
  const profileUrl = (user as any).profile_url || currentUser?.profile_url || null;
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  const displayProfileUrl = localProfilePic || profileUrl;

  // Initialize edit form when starting edit mode
  useEffect(() => {
    if (isEditing) {
      setEditForm({
        first_name: user.first_name || (firstName !== 'N/A' ? firstName : ''),
        last_name: user.last_name || (lastName !== 'N/A' ? lastName : ''),
        phone: phone !== 'N/A' ? phone : '',
        dob: dob !== 'N/A' ? dob : ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]); // Only initialize when isEditing is toggled to true

  const [updateUserDetails] = useUpdateUserDetailsByIdMutation();

  const handleSaveProfile = async () => {
    try {
      if (currentUser?.id) {
        await updateUserDetails({
          user_id: currentUser.id,
          frist_name: editForm.first_name, // Note: intentionally misspelled to match swagger
          last_name: editForm.last_name,
          dob: editForm.dob,
          profile_url: localProfilePic || undefined
        }).unwrap();
      }
      
      // Update local Redux state so UI changes immediately
      dispatch(updateUser({
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        // @ts-ignore
        phone: editForm.phone,
        dob: editForm.dob,
        profile_url: localProfilePic || undefined
      }));
    } catch (e) {
      console.error("Failed to update profile", e);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex justify-center pb-[100px] overflow-y-auto font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-[1440px] px-[40px] xl:px-[98px] pt-[38px] flex flex-col">
        
        {/* Back Button */}
        <Link 
          to="/ccs/dashboard" 
          className="inline-flex self-start items-center gap-[8px] bg-[#FFFFFF] rounded-[60px] px-[20px] py-[15px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] transition-transform hover:-translate-x-1"
        >
          <ArrowLeft className="w-[24px] h-[24px] text-[#000000]" strokeWidth={1.5} />
          <span className="font-normal text-[16px] leading-[18px] text-[#000000]">Go Back to Dashboard</span>
        </Link>
        
        {/* Main Card Container */}
        <div className="mt-[52px] bg-[#FFFFFF] rounded-[46px] w-full flex flex-col items-center px-[20px] xl:px-[50px] py-[32px] gap-[34px]">
          
          {/* Profile Banner Card */}
          <div className="w-full xl:w-[1144px] h-[291px] bg-[#FFFFFF] shadow-[0px_0px_6px_rgba(0,0,0,0.12)] rounded-[24px] relative shrink-0">
            {/* Banner Background */}
            <div 
              className="absolute left-0 right-0 top-0 h-[181px] rounded-t-[24px] bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')` }}
            />
            
            {displayProfileUrl ? (
              <div className="absolute left-[41px] top-[93px] w-[176px] h-[176px] rounded-full border-[6px] border-[#FFFFFF] shadow-sm z-10 bg-[#FFFFFF] group">
                <img
                  src={displayProfileUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    (e.currentTarget.nextElementSibling as HTMLElement | null)?.classList.remove('hidden');
                  }}
                />
                <div className="hidden items-center justify-center bg-[var(--brand-500)] text-white text-4xl font-bold w-full h-full rounded-full">
                  {initials}
                </div>
                
                {isEditing && (
                  <div 
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute left-[41px] top-[93px] w-[176px] h-[176px] rounded-full border-[6px] border-[#FFFFFF] shadow-sm z-10 bg-[#FFFFFF] group">
                <div
                  className="flex items-center justify-center bg-[var(--brand-500)] text-white text-4xl font-bold w-full h-full rounded-full"
                >
                  {initials}
                </div>
                {isEditing && (
                  <div 
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleProfilePicChange} 
            />

            {/* Profile Name and Role */}
            <div className="absolute left-[237px] top-[206px] flex flex-col z-10">
              <span className="font-bold text-[24px] leading-[30px] text-[#000000]">{fullName}</span>
              <span className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-60">{role}</span>
            </div>
          </div>

          {/* Personal Details Card */}
          <div className="w-full xl:w-[1144px] h-auto min-h-[274px] bg-[#FFFFFF] shadow-[0px_0px_6px_rgba(0,0,0,0.12)] rounded-[24px] p-[30px] shrink-0">
            <div className="flex justify-between items-center mb-[28px]">
              <h2 className="font-semibold text-[24px] leading-[30px] text-[#000000]">
                Personal details
              </h2>
              {isEditing ? (
                <div className="flex gap-[12px]">
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setLocalProfilePic(null);
                    }}
                    className="flex items-center gap-[6px] px-[16px] py-[8px] border border-[#E1E5EF] rounded-[8px] font-medium text-[14px] text-[#374151] hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-[16px] h-[16px]" />
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="flex items-center gap-[6px] px-[16px] py-[8px] bg-[#2780C4] rounded-[8px] font-medium text-[14px] text-white hover:bg-[#1f669d] transition-colors"
                  >
                    <Save className="w-[16px] h-[16px]" />
                    Save
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-[6px] px-[16px] py-[8px] border border-[#2780C4] rounded-[8px] font-medium text-[14px] text-[#2780C4] hover:bg-[rgba(39,128,196,0.05)] transition-colors"
                >
                  <Edit className="w-[16px] h-[16px]" />
                  Edit Profile
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[24px] gap-y-[28px]">
              {/* Field */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">First name</label>
                <div className="w-full h-[40px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] flex items-center px-[14px]">
                  {isEditing ? (
                    <input 
                      type="text"
                      className="w-full bg-transparent focus:outline-none font-normal text-[14px] text-[#000000]"
                      value={editForm.first_name}
                      onChange={e => setEditForm({...editForm, first_name: e.target.value})}
                      placeholder="First name"
                    />
                  ) : (
                    <span className="font-normal text-[14px] text-[#000000]">{firstName}</span>
                  )}
                </div>
              </div>
              
              {/* Field */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">Last name</label>
                <div className="w-full h-[40px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] flex items-center px-[14px]">
                  {isEditing ? (
                    <input 
                      type="text"
                      className="w-full bg-transparent focus:outline-none font-normal text-[14px] text-[#000000]"
                      value={editForm.last_name}
                      onChange={e => setEditForm({...editForm, last_name: e.target.value})}
                      placeholder="Last name"
                    />
                  ) : (
                    <span className="font-normal text-[14px] text-[#000000]">{lastName}</span>
                  )}
                </div>
              </div>

              {/* Field */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">Date Of Birth</label>
                <div className="w-full h-[40px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] flex items-center px-[14px]">
                  {isEditing ? (
                    <input 
                      type="date"
                      className="w-full bg-transparent focus:outline-none font-normal text-[14px] text-[#000000]"
                      value={editForm.dob}
                      onChange={e => setEditForm({...editForm, dob: e.target.value})}
                    />
                  ) : (
                    <span className="font-normal text-[14px] text-[#000000]">{dob}</span>
                  )}
                </div>
              </div>

              {/* Field */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">Phone number</label>
                <div className="w-full h-[40px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] flex items-center px-[14px]">
                  {isEditing ? (
                    <input 
                      type="tel"
                      className="w-full bg-transparent focus:outline-none font-normal text-[14px] text-[#000000]"
                      value={editForm.phone}
                      onChange={e => setEditForm({...editForm, phone: e.target.value})}
                      placeholder="Phone number"
                    />
                  ) : (
                    <span className="font-normal text-[14px] text-[#000000]">{phone}</span>
                  )}
                </div>
              </div>

              {/* Field */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">Email</label>
                <div className="w-full h-[40px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] flex items-center px-[14px]">
                  <span className="font-normal text-[14px] text-[#000000]">{email}</span>
                </div>
              </div>

              {/* Password Action */}
              <div className="flex flex-col justify-between gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">Password</label>
                <button
                  onClick={openPasswordModal}
                  className="w-full h-[40px] border border-[#2780C4] rounded-[12px] flex items-center justify-between px-[20px] hover:bg-[rgba(39,128,196,0.05)] transition-colors"
                >
                  <span className="font-semibold text-[14px] leading-[20px] text-[#2780C4]">Update Your Password</span>
                  <Edit className="w-[18px] h-[18px] text-[#2780C4]" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Alerts Card */}
          <div className="w-full xl:w-[1144px] h-[151px] bg-[#FFFFFF] shadow-[0px_0px_6px_rgba(0,0,0,0.12)] rounded-[24px] p-[24px] xl:px-[30px] flex flex-col gap-[24px] shrink-0">
            <h2 className="font-semibold text-[24px] leading-[30px] text-[#000000]">
              Alerts
            </h2>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-[8px]">
                <span className="font-semibold text-[18px] leading-[23px] text-[#000000] opacity-80">Notifications</span>
                <span className="font-normal text-[14px] leading-[18px] text-[#000000]">Receive updates via Notifications</span>
              </div>
              
              {/* Toggle switch */}
              <div 
                className={`relative w-[36px] h-[20px] rounded-full flex items-center px-[2px] cursor-pointer transition-colors ${alertsEnabled ? 'bg-[#4CAF50]' : 'bg-[#E0E0E0]'}`}
                onClick={() => setAlertsEnabled(!alertsEnabled)}
              >
                <div 
                  className={`w-[16px] h-[16px] bg-[#FFFFFF] rounded-full transition-transform ${alertsEnabled ? 'translate-x-[16px]' : 'translate-x-0'}`} 
                />
              </div>
            </div>
          </div>

          {/* Logout Card */}
          <div className="w-full xl:w-[1144px] h-[85px] bg-[#FFFFFF] shadow-[0px_0px_6px_rgba(0,0,0,0.12)] rounded-[24px] flex items-center justify-between px-[30px] shrink-0">
            <span className="font-medium text-[18px] leading-[23px] text-[#000000]">
              Want to logout?
            </span>
            
            <button 
              onClick={handleLogout}
              className="bg-[rgba(249,34,34,0.08)] rounded-[8px] flex items-center justify-center gap-[8px] w-[124px] h-[44px] hover:bg-[rgba(249,34,34,0.12)] transition-colors"
            >
              <LogOut className="w-[20px] h-[20px] text-[#FF2D2D]" strokeWidth={2} />
              <span className="font-medium text-[16px] leading-[20px] text-[#FF2D2D]">Logout</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── Update Password Modal ── */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-[440px] bg-[#FFFFFF] rounded-[28px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-[32px] flex flex-col gap-[24px]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[22px] leading-[28px] text-[#0F172A] font-['Plus_Jakarta_Sans']">Update Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="flex items-center justify-center w-[32px] h-[32px] rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-[18px] h-[18px] text-[#64748B]" strokeWidth={2} />
              </button>
            </div>

            {pwSuccess ? (
              <div className="flex flex-col items-center gap-[12px] py-[20px]">
                <div className="w-[56px] h-[56px] rounded-full bg-[#DCFCE7] flex items-center justify-center">
                  <svg className="w-[28px] h-[28px] text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-[16px] text-[#16A34A] font-['Plus_Jakarta_Sans']">Password updated successfully!</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-[18px]">
                {/* Current Password */}
                <div className="flex flex-col gap-[8px]">
                  <label className="font-medium text-[14px] text-[#374151] font-['Plus_Jakarta_Sans']">Current Password</label>
                  <div className="relative">
                    <input
                      type={showOld ? 'text' : 'password'}
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      placeholder="Enter current password"
                      required
                      className="w-full h-[48px] border border-[#E1E5EF] rounded-[12px] px-[16px] pr-[44px] text-[14px] text-[#0F172A] font-['Plus_Jakarta_Sans'] focus:outline-none focus:border-[#2780C4] transition-colors"
                    />
                    <button type="button" onClick={() => setShowOld(v => !v)} className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]">
                      {showOld ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-[8px]">
                  <label className="font-medium text-[14px] text-[#374151] font-['Plus_Jakarta_Sans']">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                      className="w-full h-[48px] border border-[#E1E5EF] rounded-[12px] px-[16px] pr-[44px] text-[14px] text-[#0F172A] font-['Plus_Jakarta_Sans'] focus:outline-none focus:border-[#2780C4] transition-colors"
                    />
                    <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]">
                      {showNew ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="flex flex-col gap-[8px]">
                  <label className="font-medium text-[14px] text-[#374151] font-['Plus_Jakarta_Sans']">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      required
                      className="w-full h-[48px] border border-[#E1E5EF] rounded-[12px] px-[16px] pr-[44px] text-[14px] text-[#0F172A] font-['Plus_Jakarta_Sans'] focus:outline-none focus:border-[#2780C4] transition-colors"
                    />
                    <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]">
                      {showConfirm ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {pwError && (
                  <p className="text-[13px] text-[#DC2626] font-medium font-['Plus_Jakarta_Sans'] bg-[#FEF2F2] px-[12px] py-[8px] rounded-[8px]">{pwError}</p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-[12px] mt-[4px]">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="h-[44px] px-[24px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] font-semibold text-[14px] text-[#374151] hover:bg-gray-50 transition-colors font-['Plus_Jakarta_Sans']"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="h-[44px] px-[28px] bg-[#2780C4] rounded-[12px] font-semibold text-[14px] text-[#FFFFFF] hover:bg-[#1f669d] disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-['Plus_Jakarta_Sans'] flex items-center gap-[8px]"
                  >
                    {isUpdating && <Loader2 className="w-[16px] h-[16px] animate-spin" />}
                    {isUpdating ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
