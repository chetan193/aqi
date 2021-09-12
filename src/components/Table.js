import { app } from '../config/app';
import {Row, Card} from 'react-bootstrap'

const CityBox = ({ city, aqi, color, time }) => {
  return (
    <Row>
        <Card className="m-2 p-2 rounded border" >
            <div class="d-flex flex-row gap-3">
                <div style={{color: color}} class="d-flex align-items-center align-content-center fs-3">{aqi}</div>
                <div class="d-flex flex-column justify-content-flex-start">
                    <span><strong>{city}</strong></span>
                    <span class="fs-6">{time}</span>
                </div>
            </div>
        </Card>
    </Row>
  );
};

const Table = ({ cities }) => {
  return (
    
      <Row className="mt-4">
        <Card className="flex-row border rounded bg-grey">
          {app.categories.map((category) => {
            return (
              <Card.Body key={category.type}>
                <div className="d-flex mb-2 justify-content-center" style={{ color: category.color }}> <strong>{category.type.toUpperCase()} ({category.start}-{category.end})</strong> </div>
                {cities.map((city) => {
                    let aqi = (city.aqi);
                    return (
                        <div key={city.city}>
                            {aqi >= category.start && aqi <= category.end ? (
                                <CityBox city={city.city} aqi={aqi} color={category.color} time={city.time}/>
                            ) : (
                                <></>
                            )}
                        </div>
                    );
                })}
              </Card.Body>
            );
          })}
        </Card>
      </Row>
  );
};

export default Table;
