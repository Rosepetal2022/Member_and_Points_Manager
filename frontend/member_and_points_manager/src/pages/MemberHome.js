import React from 'react';

const ownersData = [
  {
    ownerName: 'Sally Smith',
    ownerData: [
        {Address: '1234 Main Street Portland, OR 97321', PhoneNumber: '555-555-1234', Status: 'Amateur'}
    ],
    horses: [
      { horseName: 'Star', breed: 'Hanovarian', age: 5 },
      { horseName: 'Thunder', breed: 'Dutch Warmblood', age: 7 },
    ],
  }
  // Add more owners and horses as needed
];

const MemberHome = () => {
  return (
    <div>
      <h1>Member Dashboard</h1>
      {ownersData.map((owner, index) => (
        <div key={index} className="owner-section">
          <h2>Owner: {owner.ownerName}</h2>
          <table>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>status</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {owner.ownerData.map((owner, idx) => (
                  <tr key={idx}>
                    <td>{owner.Address}</td>
                    <td>{owner.PhoneNumber}</td>
                    <td>{owner.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          <div className="horses-section">
            <h3>Horses:</h3>
            <table>
              <thead>
                <tr>
                  <th>Horse Name</th>
                  <th>Breed</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {owner.horses.map((horse, idx) => (
                  <tr key={idx}>
                    <td>{horse.horseName}</td>
                    <td>{horse.breed}</td>
                    <td>{horse.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberHome;
