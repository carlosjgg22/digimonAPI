import './App.css';
import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
const { Meta } = Card;

function App() {
  const url = 'https://www.digi-api.com/api/v1/digimon'
  const [datos, setData] = useState([]);
  //creo una función asyncrona 

  const fetchApi = async () => {
    try {
      //como la respuesta es una promesa debe llevar await
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseJson = await response.json()
      const digimonData = responseJson.content
      setData(digimonData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }


  }

  useEffect(() => {
    fetchApi();
  }, [])

  return (

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {datos.map((digimon, index) => (
        <Row gutter={3}>
          <Col span={2} key={index}>
            <Card title={digimon.name}
              hoverable
              style={{
                width: 300,
                margin: 10
              }}
              cover={<img alt={digimon.image} src={digimon.image} />}
            >
              <Meta description={digimon.href} />
            </Card>
          </Col>
        </Row>


      ))}

    </div>
  );

}
export default App;
