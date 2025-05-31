import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllHorses } from '../api/horseApi';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

const groupRanges = [
    ['A', 'E'],
    ['F', 'J'],
    ['K', 'O'],
    ['P', 'T'],
    ['U', 'Z']
];

const groupHorsesByRange = (horses) => {
    const sorted = [...horses].sort((a, b) =>
        a.horse_name.localeCompare(b.horse_name)
    );

    const grouped = {};

    groupRanges.forEach(([start, end]) => {
        const key = `${start}-${end}`;
        grouped[key] = sorted.filter((horse) => {
            const firstLetter = horse.horse_name[0].toUpperCase();
            return firstLetter >= start && firstLetter <= end;
        });
    });

    return grouped;
};


const PointsList = () => {
    const [horses, setHorses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHorse, setSelectedHorse] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getAllHorses()
            .then((response) => {
                setHorses(response.data);
                console.log(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching horses:', error);
                setLoading(false);
            });
    }, []);
    const navigate = useNavigate();

    const handleViewRecord = () => {
        if (selectedHorse?.horse_id) {
            navigate(`/HorseRecord/${selectedHorse.horse_id}`);
        }
    };

    const groupedHorses = groupHorsesByRange(horses);

    const handleHorseClick = (horse) => {
        setSelectedHorse(horse);
        setModalOpen(true);
    };

    const toggleModal = () => setModalOpen(!modalOpen);

    return (
        <div>
            <h1>Points List</h1>
            {Object.entries(groupedHorses).map(([range, horsesInRange]) => (
                <div key={range}>
                    <h2>{range}</h2>
                    {horsesInRange.length > 0 ? (
                        horsesInRange.map((horse, index) => (
                            <div
                                key={index}
                                className="show"
                                style={{ cursor: 'pointer', padding: '5px' }}
                                onClick={() => handleHorseClick(horse)}
                            >
                                <h3>{horse.horse_name}</h3>
                            </div>
                        ))
                    ) : (
                        <p>No horses in this range.</p>
                    )}
                </div>
            ))}

            {/* Modal */}
            <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
                <ModalHeader toggle={toggleModal}>
                    {selectedHorse?.horse_name}
                </ModalHeader>
                <ModalBody>
                    <p><strong>Owner:</strong> {selectedHorse?.owner_name}</p>
                    <p><strong>Breed:</strong> {selectedHorse?.breed}</p>
                    <p><strong>Color:</strong> {selectedHorse?.color}</p>

                    <p>
                        <strong>Foal Date:</strong>{' '}
                        {selectedHorse?.foaled_date
                            ? new Date(selectedHorse.foaled_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })
                            : 'N/A'}
                    </p>

                    <p><strong>Hands:</strong> {selectedHorse?.hands}</p>
                    <p><strong>Sex:</strong> {selectedHorse?.sex}</p>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-between">
                    <Button color="secondary" onClick={toggleModal}>Close</Button>
                    <Button color="primary" onClick={handleViewRecord}>View Record</Button>
                </ModalFooter>

            </Modal>
        </div>
    );
};

export default PointsList;
