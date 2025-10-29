import type { FC } from 'react';
import { Form } from 'react-bootstrap';
import './ServiceItem.css';

interface Props {
  resourceImageURL: string;
  resourceName: string;
  ratio: number;
  resourceTariffCost: number;
  resourceTariff: string;
  neededAmount: number;
  totalCost: number;
  onRatioChange?: (ratio: number) => void;
}

export const ServiceItem: FC<Props> = ({
  resourceImageURL,
  resourceName,
  ratio,
  resourceTariffCost,
  resourceTariff,
  neededAmount,
  totalCost,
  onRatioChange,
}) => {
  return (
    <div className="service-item">
      <img src={resourceImageURL} alt={resourceName} className="service-image" />
      <div className="service-content">
        <div className="service-name">{resourceName}</div>
        <div className="service-usage">
          <Form.Control
            type="number"
            className="coefficient-input"
            value={ratio}
            min="0.5"
            max="1.5"
            step="0.1"
            onChange={(e) => onRatioChange?.(parseFloat(e.target.value))}
          />
        </div>
        <div className="service-price">{resourceTariffCost} {resourceTariff}</div>
        <div className="service-value">{neededAmount}</div>
        <div className="service-cost">{totalCost} руб</div>
      </div>
    </div>
  );
};