'use client';

import { withAuth } from '@/lib/auth';

function DashboardPage() {
  return <div>Захищена сторінка дашборду</div>;
}

export default withAuth(DashboardPage);
