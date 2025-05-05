import React, { useState } from 'react';

const AdminHome = () => {
    const [formData, setFormData] = useState({
        owner: '',
        horseName: '',
        showName: '',
        division: '',
        pointsEarned: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Data:', formData);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Owner:</label>
                    <input
                        type="text"
                        name="owner"
                        value={formData.owner}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Horse Name:</label>
                    <input
                        type="text"
                        name="horseName"
                        value={formData.horseName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Show Name:</label>
                    <input
                        type="text"
                        name="showName"
                        value={formData.showName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Division:</label>
                    <input
                        type="text"
                        name="division"
                        value={formData.division}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Points Earned:</label>
                    <input
                        type="number"
                        name="pointsEarned"
                        value={formData.pointsEarned}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AdminHome;
