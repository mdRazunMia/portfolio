import { Experience } from '../types/portfolio';

type ExperienceTimelineProps = {
  items: Experience[];
};

function formatDate(value?: string) {
  if (!value) {
    return 'Present';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  if (!items.length) {
    return <p className="empty-state">Experience content will show here once published.</p>;
  }

  return (
    <div className="timeline">
      {items.map((item) => (
        <article className="timeline-item" key={item.id}>
          <div className="timeline-range">
            {formatDate(item.startDate)} -{' '}
            {item.isCurrent ? 'Present' : formatDate(item.endDate)}
          </div>
          <div className="timeline-content">
            <h3>
              {item.position} at {item.company}
            </h3>
            <p>{item.description}</p>
            <div className="chip-row">
              {item.technologies.map((tech) => (
                <span className="chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
