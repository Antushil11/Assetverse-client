import React, { useState, useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxoisSecure";
import { useQuery } from "@tanstack/react-query";


const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedCompany, setSelectedCompany] = useState("");

  const { data: employees = [] } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee");
      return res.data;
    },
  });

  // Get list of unique companies for dropdown
  const companies = useMemo(() => {
    const unique = [...new Set(employees.map((e) => e.companyName))];
    return unique;
  }, [employees]);

  // Filter employees by selected company
  const filteredEmployees = useMemo(() => {
    if (!selectedCompany) return employees;
    return employees.filter((e) => e.companyName === selectedCompany);
  }, [employees, selectedCompany]);

  // Get upcoming birthdays in current month
  // const currentMonth = dayjs().month() + 1; 
  // const upcomingBirthdays = useMemo(() => {
  //   return employees.filter((e) => {
  //     if (!e.dateOfBirth) return false;
  //     const birthMonth = dayjs(e.dateOfBirth).month() + 1;
  //     return birthMonth === currentMonth;
  //   });
  // }, [employees, currentMonth]);

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4">My Team</h2>

      {/* Company Selector */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Select Company:</label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Companies</option>
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {/* Upcoming Birthdays */}
      {/* {upcomingBirthdays.length > 0 && (
        <div className="mb-6 ">
          <h3 className="text-xl font-semibold mb-2">Upcoming Birthdays</h3>
          <div className="flex flex-wrap gap-4">
            {upcomingBirthdays.map((e) => (
              <div
                key={e._id}
                className="card bg-yellow-100 w-48 p-4 rounded shadow text-center "
              >
                <img
                  src={e.photoURL || "/default-avatar.png"}
                  alt={e.name}
                  className="w-16 h-16 rounded-full mx-auto mb-2"
                />
                <p className="font-medium">{e.name}</p>
                <p className="text-sm">{dayjs(e.dateOfBirth).format("DD MMM")}</p>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Employee List */}
      <div className="flex flex-wrap gap-6  ">
        {filteredEmployees.map((employee) => (
          <div key={employee._id} className="card bg-base-100 w-64 shadow rounded border border-[#00C578] hover:shadow-2xl hover:-translate-y-2 hover:border-primary">
            <figure className="px-6 pt-6">
              <img
                src={employee.photoURL || "/default-avatar.png"}
                alt={employee.name}
                className="rounded-full w-24 h-24 object-cover mx-auto"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{employee.name}</h2>
              <p>{employee.email}</p>
              <p>{employee.position || "Employee"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
