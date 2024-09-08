import React from "react";

const JobListings = () => {
  const jobs = [
    {
      title: "Jr. Business consultant ERP",
      category: "Dynamics NAV/Business Central",
      hours: "32-40 uur",
    },
    {
      title: "Applicatie Beheerder",
      category: "MS Dynamics NAV/Business Central",
      hours: "32-40 uur",
    },
    {
      title: "Backend developer",
      category: "MS Dynamics 365 Business Central",
      hours: "32-40 uur",
    },
    {
      title: "Technisch Product Specialist",
      category: "MS Dynamics 365 Business Central",
      hours: "32-40 uur",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-pink-800 text-white p-8">
      <div className="max-w-3xl mx-auto pt-4">
        <h1 className="text-5xl font-bold mb-2">
          Become an <span className="text-orange-500">Creatotum.</span>
        </h1>
        <p className="text-gray-400 mb-8">
          Wanted: digital masterminds! Newminds is growing and that's why there
          is room in our team for new specialists.
        </p>

        <h2 className="text-2xl font-semibold mb-4 pt-5">Development</h2>

        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-inherit border hover:border-yellow-400 border-b-white rounded-lg p-4 flex justify-between items-center transition-colors"
            >
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-400">{job.category}</p>
              </div>
              <div className="flex justify-between space-x-2">
                <button className="bg-yellow-500 text-black px-2 py-2 hover:bg-white rounded-sm text-xs font-semibold  transition-colors">
                  Fulltime job
                </button>
                <button className="bg-inherit border border-gray-600 hover:bg-white hover:text-black text-white px-2 py-2 rounded-sm text-xs	 font-semibold transition-colors">
                  $32/40 Per Hour
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListings;
