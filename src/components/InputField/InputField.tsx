import type { FC } from 'react';
import { Button } from 'react-bootstrap';
import './InputField.css';

interface Props {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  placeholder?: string;
  buttonTitle?: string;
}

export const InputField: FC<Props> = ({ 
  value, 
  setValue, 
  onSubmit, 
  loading, 
  placeholder, 
  buttonTitle = 'Искать' 
}) => (
  <div className="input-field">
    <input 
      value={value} 
      placeholder={placeholder} 
      onChange={(event) => setValue(event.target.value)}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          onSubmit();
        }
      }}
    />
    <Button disabled={loading} onClick={onSubmit}>
      {buttonTitle}
    </Button>
  </div>
);