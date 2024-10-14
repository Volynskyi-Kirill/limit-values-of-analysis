'use client';

import { withAuth } from '@/lib/auth';

function DashboardPage() {
  return <div>Защищенная страница дашборда</div>;
}

export default withAuth(DashboardPage);
