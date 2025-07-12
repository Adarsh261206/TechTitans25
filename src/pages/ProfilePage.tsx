import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-6">
          <img
            src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-400">john.doe@example.com</p>
            <p className="text-sm text-green-400 mt-1">Active Member</p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-xl font-semibold mb-2">About</h3>
          <p className="text-gray-300">
            I'm a passionate developer who loves asking and answering questions on StackIt.
            Currently focused on frontend technologies and community building.
          </p>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-xl font-semibold mb-2">Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-700 p-4 rounded">
              <h4 className="text-lg font-bold text-blue-400">42</h4>
              <p className="text-sm text-gray-300">Questions Asked</p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <h4 className="text-lg font-bold text-green-400">128</h4>
              <p className="text-sm text-gray-300">Answers Given</p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <h4 className="text-lg font-bold text-yellow-400">76%</h4>
              <p className="text-sm text-gray-300">Answer Accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;