"use client";

import { useEffect, useState } from "react";

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt?: string;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    const searchTermElement = document.getElementById("search-term");
    if (searchTermElement) {
      searchTermElement.innerHTML = searchTerm;
    }

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.some(specialty => specialty.includes(searchTerm)) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <div className="w-full">
        <h1 className="text-xl md:text-3xl text-white font-bold bg-green-700 px-4 py-5 rounded-md mb-8 w-full">Solace Advocates</h1>
      </div>
      <div>
        <p className="text-lg md:text-2xl font-bold mb-2">Search</p>
        <p className="text-sm md:text-lg">
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} className="w-1/2 md:w-1/3" />
        <button onClick={onClick} className="bg-green-700 text-white px-2 md:px-4 py-2 rounded-md ml-2 text-sm md:text-lg">Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th className="whitespace-nowrap text-xs md:text-sm px-2 md:px-4">First Name</th>
            <th className="whitespace-nowrap text-xs md:text-sm px-2 md:px-4">Last Name</th>
            <th className="whitespace-nowrap text-xs md:text-sm px-2 md:px-4">City</th>
            <th className="whitespace-nowrap text-xs md:text-sm px-2 md:px-4">Degree</th>
            <th className="whitespace-nowrap text-xs md:text-sm px-2 md:px-4">Specialties</th>
            <th className="whitespace-nowrap text-xs md:text-sm px-2 md:px-4">Years of Experience</th>
            <th className="whitespace-nowrap text-xs md:text-sm px-2 md:px-4">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => {
            return (
              <tr key={advocate.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"}>
                <td className="align-top px-2 md:px-4">{advocate.firstName}</td>
                <td className="align-top px-2 md:px-4">{advocate.lastName}</td>
                <td className="align-top px-2 md:px-4">{advocate.city}</td>
                <td className="align-top px-2 md:px-4">{advocate.degree}</td>
                <td className="align-top">
                  {advocate.specialties.map((s: string, index: number) => (
                    <div key={index}>{s}</div>
                  ))}
                </td>
                <td className="align-top px-2 md:px-4">{advocate.yearsOfExperience}</td>
                <td className="align-top px-2 md:px-4">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
