import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaExchangeAlt } from 'react-icons/fa';

const ownersData = [
  {
    ownerName: 'Sally Smith',
    ownerData: [
      { Address: '1234 Main Street Portland, OR 97321', PhoneNumber: '555-555-1234', Status: 'Amateur', MemberNumber: 3983249, EmailAddress: "sallysmith@gmail.com" }
    ],
    horses: [
      { horseName: 'Star', breed: 'Hanovarian', age: 5 },
      { horseName: 'Thunder', breed: 'Dutch Warmblood', age: 7 },
    ],
  }
  // Add more owners and horses as needed
];

const MemberHome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div class="main-member-container">
        <div class="main-hero">
          <h1 class="member-dashboard--main-header">Member Dashboard</h1>
        </div>
      </div>
      <div className="member-dashboard--container">
        {ownersData.map((owner, index) => (
          <div key={index} className="owner-section">
            <h2>Hello, {owner.ownerName}</h2>
            <div>
              {owner.ownerData.map((data, dataIndex) => (
                <div class="member-dashboard--info" key={dataIndex}>
                  <div class="member-dashboard--info-details">
                    <h4><strong>Member Information</strong></h4>
                    <div>Status: {data.Status}</div>
                    <div>Member #: {data.MemberNumber}</div>
                  </div>
                  <div class="member-dashboard--info-details">
                    <h4><strong>Contact Information</strong></h4>
                    <div>Address: {data.Address}</div>
                    <div>Phone Number: {data.PhoneNumber}</div>
                    <div>Email Address: {data.EmailAddress}</div>
                    <button class="secondary-btn">Update Info</button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="horses-section">
        <h3 className='horses-section--header'>Horses</h3>
        <table>
          <thead>
            <tr>
              <th>Horse Name</th>
              <th>Breed</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {ownersData.flatMap((owner) =>
              owner.horses.map((horse, idx) => (
                <tr key={idx}>
                  <td>{horse.horseName}</td>
                  <td>{horse.breed}</td>
                  <td>{horse.age}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <h3 class="member-dashboard--options-header">Options</h3>
      <div class="member-dashboard--options">
        <div onClick={() => navigate('/EditHorse')} class="member-dashboard--card success">
          <div><FaEdit style={{ height: 50, width: 50 }} /></div>
          <div>Edit Horse</div>

        </div>

        <div onClick={() => navigate('/AddHorse')} class="member-dashboard--card success">
          <div><FaEdit style={{ height: 50, width: 50 }} /></div>
          <div>Add New Horse</div>
        </div>

        <div onClick={() => navigate('/RemoveHorse')} class="member-dashboard--card danger">
          <div><FaTrash style={{ height: 50, width: 50 }} /></div>
          <div>Remove Horse Membership</div>

        </div>

        <div onClick={() => navigate('/TransferHorse')} class="member-dashboard--card success">
          <div><FaExchangeAlt style={{ height: 50, width: 50 }} /></div>
          <div>Transfer Ownership</div>
        </div>
      </div>
    </div>

  );
};

export default MemberHome;
