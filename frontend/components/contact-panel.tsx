import { Profile } from '../types/portfolio';

type ContactPanelProps = {
  profile: Profile | null;
};

export function ContactPanel({ profile }: ContactPanelProps) {
  return (
    <section className="contact-panel">
      <div>
        <p className="eyebrow">Contact</p>
        <h1>Let&apos;s build something useful.</h1>
        <p>
          Phase 2 includes the public contact page. The submit-to-API form and admin
          inbox will land in the next backend/content phase.
        </p>
      </div>
      <div className="contact-card">
        <p>Email</p>
        <a href={`mailto:${profile?.email ?? 'hello@example.com'}`}>
          {profile?.email ?? 'hello@example.com'}
        </a>
        {profile?.linkedin ? <a href={profile.linkedin}>LinkedIn</a> : null}
        {profile?.github ? <a href={profile.github}>GitHub</a> : null}
      </div>
    </section>
  );
}
