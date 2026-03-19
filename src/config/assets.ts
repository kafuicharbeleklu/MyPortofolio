export const assetPaths = {
  profilePortrait: 'media/profile/charbel-eklu.jpg',
  resume: 'documents/cv/CV_EKLU_Kafui_Charbel_Admin_System.pdf',
  projects: {
    automate: 'projects/automate',
    azureInfra: 'projects/azure-infra',
    siem: 'projects/siem',
    smartprocure: 'projects/smartprocure',
    suno: 'projects/suno',
    tracker: 'projects/tracker',
    moov: 'projects/moov',
    orabank: 'projects/orabank',
    biasa: 'projects/biasa',
    dns: 'projects/dns',
    lanWan: 'projects/lan-wan',
    mfa: 'projects/mfa',
    postgresqlSsl: 'projects/postgresql_ssl',
    printtrack: 'projects/printtrack',
    qr: 'projects/qr',
    ubuntuLdap: 'projects/ubuntu_ldap',
    wisignal: 'projects/wisignal',
  },
} as const;

export const withBaseAsset = (assetPath: string) =>
  `${import.meta.env.BASE_URL}${assetPath.replace(/^\//, '')}`;
