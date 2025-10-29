import type { FC } from 'react';
import { Card, Button } from 'react-bootstrap';
import './HarvestResourceCard.css';

interface Props {
  id: number;
  image_url: string;
  name: string;
  tariff: string;
  description: string;
  onDetailsClick: (id: number) => void;
  onAddToApplication: (resourceId: number) => void;
}

export const HarvestResourceCard: FC<Props> = ({
  id,
  image_url,
  name,
  tariff,
  description,
  onDetailsClick,
  onAddToApplication,
}) => {
  return (
    <Card className="harvest-resource-card">
      <Card.Img 
        variant="top" 
        src={image_url} 
        className="harvest-resource-image"
      />
      <Card.Body className="harvest-resource-content">
        <Card.Title className="harvest-resource-title">{name}</Card.Title>
        <Card.Text className="harvest-resource-price">{tariff}</Card.Text>
        <Card.Text className="harvest-resource-description">{description}</Card.Text>
        <div className="harvest-resource-actions">
          <Button 
            variant="outline-primary" 
            className="btn-details"
            onClick={() => onDetailsClick(id)}
          >
            Подробнее
          </Button>
          <Button 
            variant="primary" 
            className="btn-add"
            onClick={() => onAddToApplication(id)}
          >
            В заявку
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};