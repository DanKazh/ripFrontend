import type { FC } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Routes';

export const Home: FC = () => {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Тепличный Север</h1>
          <p className="lead">
            Современная система управления урожаем для тепличных хозяйств
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ресурсы урожая</Card.Title>
              <Card.Text>
                Ознакомьтесь с полным перечнем ресурсов для тепличного хозяйства
              </Card.Text>
              <Link to={ROUTES.HARVEST_RESOURCES}>
                <Button variant="primary">Посмотреть ресурсы</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Заявка на урожай</Card.Title>
              <Card.Text>
                Управляйте вашими выбранными ресурсами и создавайте заявки на урожай
              </Card.Text>
              <Link to={ROUTES.HOME}>
                <Button variant="outline-primary">Перейти к заявке</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};