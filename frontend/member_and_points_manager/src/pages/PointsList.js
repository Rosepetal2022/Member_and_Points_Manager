import React from 'react';
import data from '../utils/dummyData';

const PointsList = () => {
  return (
    <div>
      <h1>Points List</h1>
      {data.map((show, index) => (
        <div key={index} className="show">
          <h2>{show.showName}</h2>
          <p><strong>Owner:</strong> {show.OwnerName.join(', ')}</p>
          <p><strong>Riders:</strong> {show.Riders.join(', ')}</p>
          <table>
            <thead>
              <tr>
                <th>Division</th>
                <th>Points Earned</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {show.jumperPoints.map((point, idx) => (
                <tr key={idx}>
                  <td>{point.division}</td>
                  <td>{point.pointsEarned}</td>
                  <td>Jumper</td>
                </tr>
              ))}
              {show.equitationPoints.map((point, idx) => (
                <tr key={idx}>
                  <td>{point.division}</td>
                  <td>{point.pointsEarned}</td>
                  <td>Equitation</td>
                </tr>
              ))}
              {show.hunterPoints.map((point, idx) => (
                <tr key={idx}>
                  <td>{point.division}</td>
                  <td>{point.pointsEarned}</td>
                  <td>Hunter</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PointsList;

