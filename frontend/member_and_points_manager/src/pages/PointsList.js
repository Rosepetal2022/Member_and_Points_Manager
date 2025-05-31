import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllHorses } from '../api/horseApi';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Spinner
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
    const navigate = useNavigate();

    useEffect(() => {
        getAllHorses()
            .then((response) => {
                setHorses(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching horses:', error);
                setLoading(false);
            });
    }, []);

    const handleHorseClick = (horse) => {
        setSelectedHorse(horse);
        setModalOpen(true);
    };

    const handleViewRecord = () => {
        if (selectedHorse?.horse_id) {
            navigate(`/HorseRecord/${selectedHorse.horse_id}`);
        }
    };

    const toggleModal = () => setModalOpen(!modalOpen);

    const groupedHorses = groupHorsesByRange(horses);

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Points List</h1>
            {loading ? (
                <div className="text-center">
                    <Spinner color="primary" />
                </div>
            ) : (
                <Row>
                    {Object.entries(groupedHorses).map(([range, horsesInRange]) => (
                        <Col md={6} lg={4} key={range} className="mb-4">
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">{range}</CardTitle>
                                    {horsesInRange.length > 0 ? (
                                        <ListGroup flush>
                                            {horsesInRange.map((horse, index) => (
                                                <ListGroupItem
                                                    key={index}
                                                    action
                                                    onClick={() => handleHorseClick(horse)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {horse.horse_name}
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    ) : (
                                        <p className="text-muted">No horses in this range.</p>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

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
                    <Button color="primary" onClick={handleViewRecord}>View Show Record</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default PointsList;
