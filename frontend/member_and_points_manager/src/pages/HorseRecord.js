import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getHorseRecord } from '../api/horseApi';
import {
    Table,
    Container,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';

const HorseRecord = () => {
    const { horseId } = useParams();
    const [horseRecord, setHorseRecord] = useState([]);

    useEffect(() => {
        getHorseRecord(horseId)
            .then((response) => {
                setHorseRecord(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching horse record:', error);
            });
    }, [horseId]);

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

    return (
        <Container className="mt-5">
            <Card>
                <CardBody>
                    <CardTitle tag="h2" className="mb-4">
                        Horse Record: {horseRecord[0]?.horse_name || 'Unknown'}
                    </CardTitle>
                    {horseRecord[0]?.class_name === null ? (
                        <p>No Show Results Available.</p>
                    ) : (
                    <Table bordered hover responsive>
                        <thead className="thead-dark">
                            <tr>
                                <th>Show Name</th>
                                <th>Class Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Place</th>
                                <th>Points Earned</th>
                                <th>Money Awarded ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horseRecord.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.show_name}</td>
                                    <td>{record.class_name}</td>
                                    <td>{formatDate(record.show_start_date)}</td>
                                    <td>{formatDate(record.show_end_date)}</td>
                                    <td>{record.place}</td>
                                    <td>{record.points_earned}</td>
                                    <td>{record.money_awarded}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    )}
                </CardBody>
            </Card>
        </Container>
    );
};

export default HorseRecord;

