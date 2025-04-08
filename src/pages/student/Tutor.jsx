import React, { useEffect } from "react";
import useStudent from "../../redux/hooks/useStudent";
import avt from "../../assets/avt.jpg";

function Tutor() {
  const { isLoading, assignedTutors, fetchAssignedTutors } = useStudent();

  useEffect(() => {
    fetchAssignedTutors();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (!assignedTutors.length) {
    return (
      <div className="p-4 bg-blue-50 text-blue-700 rounded">
        No tutors assigned
      </div>
    );
  }

  return (
    <ul className="max-w-3xl mx-auto space-y-8 p-6">
      {assignedTutors.map((tutor, index) => (
        <li key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img
                src={avt}
                alt={tutor.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100 hover:border-blue-200 transition-all duration-300 shadow-md"
              />
              <div className="absolute -bottom-2 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-300">
                {tutor.name}
              </h3>
              <div className="grid gap-4">
                {[
                  { label: "Name", key: "name", icon: "👤" },
                  { label: "Date of Birth", key: "dateOfBirth", icon: "🎂" },
                  { label: "Address", key: "address", icon: "📍" },
                  { label: "Email", key: "email", icon: "📧" },
                ].map(
                  ({ label, key, icon }) =>
                    tutor[key] && (
                      <p key={key} className="flex items-center text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                        <span className="w-8 text-xl">{icon}</span>
                        <span className="w-32 font-medium text-gray-700">
                          {label}:
                        </span>
                        <span className="flex-1">
                          {key === "dateOfBirth"
                            ? new Date(tutor[key]).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })
                            : tutor[key]}
                        </span>
                      </p>
                    )
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Tutor;
