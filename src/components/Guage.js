import React from 'react';
import {Row, Card, Spinner} from 'react-bootstrap'
import Gauge from 'react-svg-gauge';

const Chart = ({selectedCity, cities, setSelectedCity}) => {
    return (
        <Row className="mt-4">
            <Card className="border rounded bg-grey">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div className="">
                            <Gauge 
                                value={selectedCity.percentage} 
                                min={selectedCity.start} 
                                max={selectedCity.end} 
                                label={selectedCity.label} 
                                color={selectedCity.color} 
                                topLabelStyle={{fill: selectedCity.color, fontSize: "1.5rem"}}
                                minMaxLabelStyle={{fill: selectedCity.color}}
                                valueLabelStyle={{fill: "white", fontSize: "3rem"}}
                            />
                        </div>
                        <div className="">
                            <select class="form-select" value={selectedCity.city} onChange={(e) => setSelectedCity({...selectedCity, ...{city: e.target.value}})}>
                                <option hidden selected>please select any city</option>
                                {cities && cities.map((e, key) => {
                                    return <option key={key} value={e.city}>{e.city}</option>;
                                })}
                            </select>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Row>
    );
  }
  
  export default Chart;