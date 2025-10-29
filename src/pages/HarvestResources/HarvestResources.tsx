import type { FC } from 'react';
import { useState, useEffect } from 'react';
import type { HarvestResource } from '../../modules/harvestApi';
import { getHarvestResources, addResourceToApplication } from '../../modules/harvestApi';
import { HARVEST_RESOURCES_MOCK } from '../../modules/mock';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";

export const HarvestResources: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [harvestResources, setHarvestResources] = useState<HarvestResource[]>([]);
  const [harvestApplicationCount, setHarvestApplicationCount] = useState(0);
  const [harvestApplicationId] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    loadHarvestResources();
  }, []);

  const loadHarvestResources = async () => {
    setLoading(true);
    try {
      const resources = await getHarvestResources(searchValue);
      const resourcesArray = Array.isArray(resources) ? resources : [];
      setHarvestResources(resourcesArray);
    } catch (error) {
      console.error('Ошибка загрузки ресурсов:', error);
      const filteredResources = HARVEST_RESOURCES_MOCK.filter(resource =>
        resource.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setHarvestResources(filteredResources);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadHarvestResources();
  };

  const handleAddToApplication = async (resourceId: number, e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addResourceToApplication(harvestApplicationId, resourceId);
      setHarvestApplicationCount(prev => prev + 1);
    } catch (error) {
      console.error("Ошибка при добавлении ресурса в заявку:", error);
    }
  };

  const resourcesToRender = Array.isArray(harvestResources) ? harvestResources : [];

  return (
    <div style={{
      fontFamily: "'Noto Sans', sans-serif",
      margin: 0,
      padding: 0
    }}>
      
      <section style={{
        padding: '20px 80px',
        textAlign: 'left'
      }}>
        <form onSubmit={handleSearch} style={{
          margin: '0 25px',
          backgroundColor: '#e5e5e5'
        }}>
          <input 
            type="text" 
            placeholder="Поиск по наименованию" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              padding: '15px 20px',
              fontSize: '23px',
              border: 'none',
              outline: 'none',
              backgroundColor: '#e5e5e5',
              width: '50%'
            }}
          />
          <button type="submit" style={{ display: 'none' }}>Поиск</button>
        </form>
      </section>
      
      <section style={{
        maxWidth: '1312px',
        margin: '0 auto',
        padding: '0 80px 30px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px 20px'
        }}>
          {loading && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              gridColumn: '1 / -1'
            }}>
              <p>Загрузка...</p>
            </div>
          )}
          
          {!loading && resourcesToRender.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              gridColumn: '1 / -1'
            }}>
              <p>Услуги не найдены</p>
            </div>
          )}
          
          {!loading && resourcesToRender.map((resource) => (
            <div key={resource.id} style={{
              backgroundColor: '#f7f7f7',
              border: '1px solid #d1cccc',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <img 
                src={resource.image_url} 
                alt={resource.name} 
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '10px'
                }}>{resource.name}</h3>
                <h5 style={{
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>{resource.tariff}</h5>
                <p style={{
                  marginBottom: '20px'
                }}>{resource.description}</p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 'auto'
                }}>
                  <a 
                    href={`${ROUTES.HARVEST_DETAILED_RESOURCE}/${resource.id}`} 
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      backgroundColor: '#f7f7f7',
                      color: '#00a651'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`${ROUTES.HARVEST_DETAILED_RESOURCE}/${resource.id}`);
                    }}
                  >
                    Подробнее
                  </a>
                  <form 
                    onSubmit={(e) => handleAddToApplication(resource.id, e)}
                    method="POST"
                  >
                    <input type="hidden" name="resource_id" value={resource.id} />
                    <button type="submit" style={{
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      backgroundColor: '#f7f7f7',
                      color: '#00a651'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      В заявку
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {harvestApplicationCount > 0 ? (
        <a 
          href={`${ROUTES.HARVEST_APPLICATION}/${harvestApplicationId}`}
          style={{
            position: 'fixed',
            left: '20px',
            bottom: '20px',
            display: 'inline-block'
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`${ROUTES.HARVEST_APPLICATION}/${harvestApplicationId}`);
          }}
        >
          <img 
            src="http://127.0.0.1:9000/lab1/card.webp" 
            alt="Корзина" 
            style={{
              width: '60px',
              height: '60px',
              cursor: 'pointer'
            }}
          />
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: '#ff4444',
            color: 'white',
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {harvestApplicationCount}
          </span>
        </a>
      ) : (
        <div style={{
          position: 'fixed',
          left: '20px',
          bottom: '20px',
          display: 'inline-block'
        }}>
          <img 
            src="http://127.0.0.1:9000/lab1/disabled.webp" 
            alt="Корзина" 
            style={{
              width: '60px',
              height: '60px'
            }}
          />
        </div>
      )}
    </div>
  );
};