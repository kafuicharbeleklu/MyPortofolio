export const assetPaths = {
  profilePortrait: 'media/profile/charbel-eklu.jpg',
  resume: 'documents/cv/CV_EKLU_Kafui_Charbel_Admin_System.pdf',
  projects: {
    siem: 'projects/siem',
    moov: 'projects/moov',
    orabank: 'projects/orabank',
    biasa: 'projects/biasa',
    azureInfra: 'projects/azure-infra',
    lanWan: 'projects/lan-wan',
  },
} as const;

export const withBaseAsset = (assetPath: string) =>
  `${import.meta.env.BASE_URL}${assetPath.replace(/^\//, '')}`;
