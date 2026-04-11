import { ProfileAdminForm } from '../../../../components/profile-admin-form';
import { getAdminProfile } from '../../../../services/admin-server';

export default async function AdminProfilePage() {
  const profile = await getAdminProfile();

  return <ProfileAdminForm initialProfile={profile} />;
}
