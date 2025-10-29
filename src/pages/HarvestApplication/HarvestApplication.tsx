import "./HarvestApplication.css";
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import type { HarvestApplicationResource, HarvestApplicationInfo } from '../../modules/harvestApi';
import { getHarvestApplication, setApplicationChanges, saveApplication, deleteApplication } from '../../modules/harvestApi';
import { HARVEST_APPLICATION_MOCK, HARVEST_APPLICATION_INFO_MOCK } from '../../modules/mock';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from "../../Routes";

export const HarvestApplication: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [harvestApplication, setHarvestApplication] = useState<HarvestApplicationResource[]>([]);
  const [harvestApplicationInfo, setHarvestApplicationInfo] = useState<HarvestApplicationInfo>({
    productivity: 0,
    weight: 0
  });
  const [harvestApplicationTotalCost, setHarvestApplicationTotalCost] = useState(0);

  useEffect(() => {
    if (id) {
      loadHarvestApplication(parseInt(id));
    }
  }, [id]);

  const loadHarvestApplication = async (applicationId: number) => {
    setLoading(true);
    try {
      const data = await getHarvestApplication(applicationId);
      setHarvestApplication(data.application);
      setHarvestApplicationInfo(data.info);
      setHarvestApplicationTotalCost(data.total_cost);
    } catch (error) {
      setHarvestApplication(HARVEST_APPLICATION_MOCK);
      setHarvestApplicationInfo(HARVEST_APPLICATION_INFO_MOCK);
      setHarvestApplicationTotalCost(7500);
    }
    setLoading(false);
  };

  const handleSetChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await setApplicationChanges(parseInt(id), harvestApplicationInfo);
      } catch (error) {
        console.error("Ошибка при сохранении изменений:", error);
      }
    }
  };

  const handleSaveApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      setLoading(true);
      try {
        await saveApplication(parseInt(id));
        navigate(ROUTES.HARVEST_RESOURCES);
      } catch (error) {
        console.error("Ошибка при сохранении заявки:", error);
      }
      setLoading(false);
    }
  };

  const handleDeleteApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      setLoading(true);
      try {
        await deleteApplication(parseInt(id));
        navigate(ROUTES.HARVEST_RESOURCES);
      } catch (error) {
        console.error("Ошибка при удалении заявки:", error);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <h1>
          <a href={ROUTES.HARVEST_RESOURCES} style={{ color: 'white', textDecoration: 'none' }}>
            Тепличный север
          </a>
        </h1>
      </header>
      
      <div className="application-container">
        <h1 className="application-title">Оформление заявки</h1>
        
        <div className="application-form">
          <h2 className="section-title">Информация о культуре</h2>
          
          <form onSubmit={handleSetChanges}>
            <div className="culture-info">
              <div className="input-group">
                <div className="culture-type-label">Урожайность (кг/м²)</div>
                <input 
                  type="number"
                  name="productivity"
                  value={harvestApplicationInfo.productivity}
                  onChange={(e) => setHarvestApplicationInfo({
                    ...harvestApplicationInfo,
                    productivity: parseInt(e.target.value)
                  })}
                  min="1" 
                  max="20" 
                  required 
                />
                <div className="input-limit">От 1 до 20 кг/м²</div>
              </div>
              
              <div className="input-group">
                <div className="harvest-amount-label">Планируемый урожай (кг)</div>
                <input 
                  type="number"
                  name="weight"
                  value={harvestApplicationInfo.weight}
                  onChange={(e) => setHarvestApplicationInfo({
                    ...harvestApplicationInfo,
                    weight: parseInt(e.target.value)
                  })}
                  min="0" 
                  max="1000"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/[^0-9]/g, '');
                    if (parseInt(target.value) > 1000) target.value = '1000';
                  }}
                  required 
                />
                <div className="input-limit">Максимум 1000 кг</div>
              </div>
            </div>
            <button type="submit" style={{ display: 'none' }}></button>
          </form>
          
          <h2 className="service-title">Выбранные услуги</h2>
          
          <div className="services-section">
            {harvestApplication.map((service, index) => (
              <div key={index} className="service-item">
                <img src={service.resource_image_url} alt={service.resource_name} className="service-image" />
                <div className="service-content">
                  <div className="service-name">{service.resource_name}</div>
                  <div className="service-usage">
                    <input 
                      type="text" 
                      className="coefficient-input" 
                      value={service.ratio}
                      readOnly
                    />
                  </div>
                  <div className="service-price">{service.resource_tariff_cost} {service.resource_tariff}</div>
                  <div className="service-value">{service.needed_amount} {service.resource_measurement}</div>
                  <div className="service-cost">{service.total_cost} руб</div>
                  <div className="service-labels">
                    <div className="service-label">Наименование</div>
                    <div className="service-label">Интенсивность использования (от 0.5 до 1.5)</div>
                    <div className="service-label">Тариф</div>
                    <div className="service-label">Ожидаемое потребление</div>
                    <div className="service-label">Стоимость</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="action-buttons">
            <div className="total-section">
              <span className="total-label">Итого:</span>
              <span className="total-amount">{harvestApplicationTotalCost} руб</span>
            </div>
            
            <div className="buttons-group">
              <form onSubmit={handleSaveApplication}>
                <button type="submit" className="btn-save">Сохранить заявку</button>
              </form>
              <form onSubmit={handleDeleteApplication}>
                <button type="submit" className="btn-delete">Удалить заявку</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};