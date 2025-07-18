import React, { useContext, useEffect, useState } from 'react'
import { updateProfile } from 'firebase/auth'
import Loader from '@/Shared/Loader'
import { AuthContext } from '@/Provider/AuthProvider'
import useRole from '@/hooks/useRole'
import { Helmet } from 'react-helmet-async'

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [role, isRoleLoading] = useRole()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.displayName || '')
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '')
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState(null)
    const [pageTitle, setPageTitle] = useState('FitFolio');

  useEffect(() => {
    const newTitle = 'FitFolio | Profile';
    setPageTitle(newTitle);
    document.title = newTitle;

  }, [])

  if (isRoleLoading || !user) return <Loader />

  const handleUpdateProfile = async () => {
    setIsUpdating(true)
    setError(null)

    try {
      await updateProfile(user, { displayName: name, photoURL })

      user.displayName = name
      user.photoURL = photoURL

      setIsEditing(false)
    } catch (err) {
      setError('Failed to update profile. Try again.')
      console.error(err)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-black px-4">
      <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
      <div className="bg-white/20 backdrop-blur-md border border-whitez shadow-inner-custom rounded-2xl w-full max-w-3xl p-4">
        {/* Cover Image */}
        <img
          src="https://i.postimg.cc/qR0LkB1q/dumble.jpg"
          alt="Cover"
          className="w-full h-80 object-cover rounded-xl mb-6"
        />

        <div className="flex flex-col items-center -mt-24 pb-6">
          {/* Profile Picture */}
          <img
            src={photoURL || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="h-28 w-28 object-cover rounded-full border-4 border-white shadow-md"
          />

          {/* Role Badge */}
          <span className="mt-4 px-4 py-1 bg-lime-500 text-white text-sm rounded-full">
            {role?.toUpperCase()}
          </span>

          {/* User ID */}
          <p className="mt-2 text-sm text-white/80">User ID: {user.uid}</p>

          {/* Editable Form */}
          <div
            className="mt-8 w-full max-w-xl mx-auto space-y-6 p-6 rounded-xl
              bg-white/10 backdrop-blur-md border border-white/20
              text-white"
            style={{
              boxShadow:
                'inset 4px 4px 8px rgba(255, 255, 255, 0.3), inset -4px -4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={isUpdating}
                    className="w-full px-4 py-2 rounded-md border border-white/50 bg-white/10 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="font-medium">{user.displayName || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold">Email (uneditable)</label>
                <p className="font-medium select-none">{user.email}</p>
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1 font-semibold">Profile Picture URL</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={photoURL}
                    onChange={e => setPhotoURL(e.target.value)}
                    disabled={isUpdating}
                    className="w-full px-4 py-2 rounded-md border border-white/50 bg-white/10 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                    placeholder="Enter image URL"
                  />
                ) : (
                  <p className="truncate max-w-full font-medium">{user.photoURL || 'N/A'}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1 font-semibold">Last Login</label>
                <p className="font-medium">
                  {user.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleString()
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Error message */}
            {error && <p className="text-red-400 text-center font-semibold">{error}</p>}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={isUpdating}
                    className="flex-1 px-6 cursor-pointer py-3 bg-lime-500 hover:bg-lime-600 disabled:opacity-50 text-white font-semibold rounded-lg transition"
                  >
                    {isUpdating ? 'Updating...' : 'Save'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setName(user.displayName || '')
                      setPhotoURL(user.photoURL || '')
                      setError(null)
                    }}
                    disabled={isUpdating}
                    className="flex-1 px-6 cursor-pointer py-3 bg-white/30 hover:bg-white/40 disabled:opacity-50 text-black font-semibold rounded-lg transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full cursor-pointer sm:w-auto px-8 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-lg transition"
                >
                  Update Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
