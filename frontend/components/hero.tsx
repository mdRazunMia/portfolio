import { Profile } from '../types/portfolio';

type HeroProps = {
  profile: Profile | null;
  featuredCount: number;
};

export function Hero({ profile, featuredCount }: HeroProps) {
  return (
    <section className="hero-panel">
      <div>
        <p className="eyebrow">Personal Portfolio Platform</p>
        <h1>{profile?.name ?? 'Your Name Here'}</h1>
        <p className="hero-title">
          {profile?.title ?? 'Dynamic developer portfolio with a CMS-backed workflow'}
        </p>
      </div>
      <div className="hero-meta">
        <p>{profile?.summary ?? 'Profile content will load from the backend API.'}</p>
        <div className="hero-stats">
          <div>
            <span>{featuredCount}</span>
            <p>Featured projects</p>
          </div>
          <div>
            <span>{profile?.location ?? 'Global'}</span>
            <p>Base location</p>
          </div>
        </div>
      </div>
    </section>
  );
}
