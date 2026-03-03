export const orgStats = {
  org: 'ProjectX',
  owner: 'Nammagiri',
  totalScans: 100,
  scheduled: 1000,
  rescans: 100,
  failedScans: 100,
  lastUpdated: '10 mins ago',
}

export const severityData = [
  { label: 'Critical Severity', count: 86, change: 2, isIncrease: true, color: 'critical' },
  { label: 'High Severity', count: 16, change: 0.9, isIncrease: true, color: 'high' },
  { label: 'Medium Severity', count: 26, change: 0.9, isIncrease: false, color: 'medium' },
  { label: 'Low Severity', count: 16, change: 0.9, isIncrease: true, color: 'low' },
]

export const scans = [
  { id: '1', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '2', name: 'IoT Devices', type: 'Blackbox', status: 'Scheduled', progress: 100, vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: '3d ago' },
  { id: '3', name: 'Temp Data', type: 'Greybox', status: 'Failed', progress: 10, vulnerabilities: { critical: 0, high: 1, medium: 2, low: 0 }, lastScan: '1d ago' },
  { id: '4', name: 'API Gateway', type: 'Blackbox', status: 'Completed', progress: 100, vulnerabilities: { critical: 1, high: 3, medium: 7, low: 12 }, lastScan: '5d ago' },
  { id: '5', name: 'Legacy Systems', type: 'Greybox', status: 'Scheduled', progress: 100, vulnerabilities: { critical: 12, high: 8, medium: 15, low: 22 }, lastScan: '2d ago' },
  { id: '6', name: 'Customer Portal', type: 'Greybox', status: 'Completed', progress: 100, vulnerabilities: { critical: 0, high: 2, medium: 5, low: 9 }, lastScan: '6d ago' },
  { id: '7', name: 'Internal APIs', type: 'Blackbox', status: 'Completed', progress: 100, vulnerabilities: { critical: 3, high: 6, medium: 14, low: 11 }, lastScan: '1w ago' },
  { id: '8', name: 'Auth Service', type: 'Greybox', status: 'Scheduled', progress: 100, vulnerabilities: { critical: 1, high: 4, medium: 3, low: 2 }, lastScan: '4d ago' },
  { id: '9', name: 'Payment Gateway', type: 'Blackbox', status: 'Completed', progress: 100, vulnerabilities: { critical: 0, high: 1, medium: 4, low: 7 }, lastScan: '3d ago' },
  { id: '10', name: 'Admin Panel', type: 'Greybox', status: 'Failed', progress: 45, vulnerabilities: { critical: 2, high: 5, medium: 8, low: 0 }, lastScan: '2d ago' },
  { id: '11', name: 'Mobile Backend', type: 'Blackbox', status: 'Completed', progress: 100, vulnerabilities: { critical: 0, high: 0, medium: 6, low: 15 }, lastScan: '5d ago' },
  { id: '12', name: 'CDN Origin', type: 'Greybox', status: 'Scheduled', progress: 100, vulnerabilities: { critical: 0, high: 2, medium: 9, low: 4 }, lastScan: '1d ago' },
  { id: '13', name: 'Staging Env', type: 'Blackbox', status: 'Completed', progress: 100, vulnerabilities: { critical: 8, high: 11, medium: 19, low: 6 }, lastScan: '2w ago' },
  { id: '14', name: 'Webhook Endpoints', type: 'Greybox', status: 'Completed', progress: 100, vulnerabilities: { critical: 1, high: 3, medium: 7, low: 12 }, lastScan: '4d ago' },
  { id: '15', name: 'GraphQL Layer', type: 'Blackbox', status: 'Scheduled', progress: 100, vulnerabilities: { critical: 0, high: 1, medium: 4, low: 8 }, lastScan: '3d ago' },
]

export const scanSteps = [
  { id: 'spidering', label: 'Spidering', active: true },
  { id: 'mapping', label: 'Mapping', active: true },
  { id: 'testing', label: 'Testing', active: false },
  { id: 'validating', label: 'Validating', active: false },
  { id: 'reporting', label: 'Reporting', active: false },
]

export const scanMeta = {
  scanType: 'Grey Box',
  targets: 'google.com',
  startedAt: 'Nov 22, 09:00AM',
  credentials: '2 Active',
  files: 'Control.pdf',
  checklists: '40/350',
}

export const activityLogs = [
  '[09:00:00] Starting systematic penetration test on helpdesk.democorp.com',
  '[09:00:12] Target is online. Apache httpd 2.4.65 on port 80',
  '[09:00:45] Discovered login page for a Help Desk Platform',
  '[09:01:02] TODO: Delete the testing account (test:test)',
  '[09:01:23] Attempting redirect via /password/test',
  '[09:01:45] Credentials test:test applied to /api',
  '[09:02:11] X-UserId: 10032 header found — **IDOR vulnerability**',
]

export const findings = [
  {
    severity: 'Critical',
    title: 'SQL Injection in Authentication Endpoint',
    endpoint: '/api/users/profile',
    description: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
    time: '10:45:23',
  },
  {
    severity: 'High',
    title: 'Unauthorized Access to User Metadata',
    endpoint: '/api/auth/login',
    description: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
    time: '10:45:23',
  },
  {
    severity: 'Medium',
    title: 'Broken Authentication Rate Limiting',
    endpoint: '/api/search',
    description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
    time: '10:45:23',
  },
]

export const footerStats = {
  subAgents: 0,
  parallelExecutions: 2,
  operations: 1,
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
}
