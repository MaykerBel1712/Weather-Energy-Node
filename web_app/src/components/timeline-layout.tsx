import {
    Timeline,
    TimelineItem,
    TimelineTitle,
    TimelineDescription,
    TimelineTime,
    TimelineHeader,
  } from '@/components/timeline';
  
  import { TimelineItemType } from '@/types';
  
  const timelineData: TimelineItemType[] = [
    {
      id: 1,
      title: 'Revisión de la literatura',
      description:
        '',
      time: 'Fase 1',
    },
    {
      id: 2,
      title: 'Calibración de los equipos',
      description:
        '',
      time: 'Fase 2',
    },
    {
      id: 3,
      title: 'Desarrollo de la estación meteorológica',
      description: '',
      time: 'Fase 3',
    },
    {
      id: 4,
      title: 'Desarrollo del prototipo de recolección de datos energéticos',
      description: '',
      time: 'Fase 4',
    },
    {
      id: 5,
      title: 'Desarrollo de aplicación web',
      description: '',
      time: 'Fase 5',
    },
    {
      id: 6,
      title: 'Evaluación del sistema',
      description: '',
      time: 'Fase 6',
    },
  ];
  
  export const TimelineLayout = () => {
    return (
      <Timeline className='mt-8'>
        {timelineData.map((item) => (
          <TimelineItem key={item.id}>
            <TimelineHeader>
              <TimelineTime>{item.time}</TimelineTime>
              <TimelineTitle className="text-left">{item.title}</TimelineTitle>
            </TimelineHeader>
          </TimelineItem>
        ))}
      </Timeline>
    );
  };