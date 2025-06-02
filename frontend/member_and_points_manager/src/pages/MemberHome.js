import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaExchangeAlt } from 'react-icons/fa';
import Auth from '../utils/auth'
import { getMemberById } from '../api/userApi';
import { getHorsesByMemberId } from '../api/horseApi';


const MemberHome = () => {
    const [memberData, setMemberData] = useState([]);
    const [horseData, setHorseData] = useState([]);

    const userId = Auth.getUserId();
    console.log('User ID:', userId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [memberResponse, horsesResponse] = await Promise.all([
                    getMemberById(userId),
                    getHorsesByMemberId(userId)
                ]);

                setMemberData(memberResponse.data);
                const horses = Array.isArray(horsesResponse.data) ? horsesResponse.data : [];
                setHorseData(horses);


                console.log('Member:', memberResponse.data);
                console.log('Horses:', horsesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    console.log(horseData)
    return (
        <div>
            <div class="main-member-container">
                <div class="main-hero">
                    <h1 class="member-dashboard--main-header">Member Dashboard</h1>
                </div>
            </div>
            <div className="member-dashboard--container">
                <div className="owner-section">
                    <h2>Hello, {memberData.first_name}</h2>
                    <div>
                        <div class="member-dashboard--info">
                            <div class="member-dashboard--info-details">
                                <h4><strong>Member Information</strong></h4>
                                <div>Status: {memberData.member_status}</div>
                                <div>Member #: {memberData.member_number}</div>
                            </div>
                            <div class="member-dashboard--info-details">
                                <h4><strong>Contact Information</strong></h4>
                                <div>Address: {memberData.street_address} {memberData.us_state} {memberData.zip_code}</div>
                                <div>Phone Number: {memberData.phone_number}</div>
                                <div>Email Address: {memberData.email_address}</div>
                                <button class="secondary-btn">Update Info</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div className="horses-section">
                <h3 className='horses-section--header'>Horses</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Horse Name</th>
                            <th>Breed</th>
                            <th>Color</th>
                            <th>Height</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {horseData.map((horse, idx) => (
                            <tr key={idx}>
                                <td>{horse.horse_name}</td>
                                <td>{horse.breed}</td>
                                <td>{horse.color}</td>
                                <td>{horse.hands}</td>
                                <td>{new Date(horse.foaled_date).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}</td>

                            </tr>
                        ))
                        }
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
