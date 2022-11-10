import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import ClickableList from "../../components/clickable-list";
import InputField from "../../components/input";
import { useSearch } from './hooks';
import styles from './styles.module.scss';

const SearchForm = () => {
    const { textValue, handleSearch, handleTextUpdate, responseList, getNearestRestaurant, property, toggle, isLoading } = useSearch();
    return (
        <div className={`${styles.outerContainer} d-flex justify-content-center`}>
            <Row className="mt-4">
                <Col lg='10' >
                    <InputField placeholder='Enter your address' value={textValue} onChange={(e) => handleTextUpdate(e.target.value)} />
                </Col>
                <Col lg='2' >
                    <Button onClick={handleSearch}>Search</Button>
                </Col>
                {isLoading && 'Searching Locations...'}
                {responseList?.length > 0 && <ClickableList list={responseList} onClick={getNearestRestaurant} />}
            </Row>
            <Modal isOpen={!!property?.property} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <h6>{property?.property !== 'not found' && property?.property ? 'Nearest Restro will be:' : ''}</h6>
                    <p>{property?.property}</p>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default SearchForm;