import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { HarvestResource } from '../../modules/harvestApi';
import { getHarvestDetailedResource } from '../../modules/harvestApi';
import { HARVEST_RESOURCES_MOCK } from '../../modules/mock';
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";

export const HarvestDetailedResource: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [harvestResource, setHarvestResource] = useState<HarvestResource | null>(null);

  useEffect(() => {
    const loadResource = async () => {
      if (!id) return;
      
      try {
        const resource = await getHarvestDetailedResource(parseInt(id));
        setHarvestResource(resource);
      } catch (error) {
        const mockResource = HARVEST_RESOURCES_MOCK.find(r => r.id === parseInt(id));
        setHarvestResource(mockResource || null);
      }
    };

    loadResource();
  }, [id]);

  if (!harvestResource) {
    return null;
  }

  return (
    <div style={{
      fontFamily: "'Noto Sans', sans-serif",
      margin: 0,
      padding: 0
    }}>
      <BreadCrumbs 
        crumbs={[
          { label: ROUTE_LABELS.HARVEST_RESOURCES, path: ROUTES.HARVEST_RESOURCES },
          { label: harvestResource.name }
        ]} 
      />
      
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '30px 80px'
      }}>
        <div style={{
          backgroundColor: '#f7f7f7',
          border: '1px solid #d1cccc',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <img 
            src={harvestResource.image_url} 
            alt={harvestResource.name} 
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover'
            }} 
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '40px'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '15px'
            }}>{harvestResource.name}</h2>
            <h3 style={{
              fontWeight: 'bold',
              marginBottom: '20px',
              fontSize: '1.5rem'
            }}>{harvestResource.tariff}</h3>
            <p style={{
              marginBottom: '30px',
              fontSize: '1.2rem',
              lineHeight: '1.6'
            }}>
              {harvestResource.detailed_description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};