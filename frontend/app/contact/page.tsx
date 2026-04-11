import { ContactPanel } from '../../components/contact-panel';
import { getProfile } from '../../services/api';

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <main className="page-stack">
      <ContactPanel profile={profile} />
    </main>
  );
}
