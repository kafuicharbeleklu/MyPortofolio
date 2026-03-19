# M365 Power BI Dashboard (PBIP)

Tableau de bord Power BI pour le suivi des utilisateurs Microsoft 365, des licences et des risques de capacité.

## Structure

- `M365_UI.pbip` : point d’entrée du projet.
- `M365_UI.Report/` : pages, visuels, bookmarks, thème.
- `M365_UI.SemanticModel/` : modèle tabulaire (TMDL), mesures DAX, relations.
- `Screenshots/` : captures de validation UI/UX.

## Ouvrir le projet

1. Ouvrir `M365_UI.pbip` dans Power BI Desktop (mode PBIP).
2. Vérifier les paramètres du modèle (tenant/app secret) dans :
   `M365_UI.SemanticModel/definition/expressions.tmdl`
3. Remplacer les placeholders suivants par vos valeurs environnement :
   - `REPLACE_WITH_TENANT_ID`
   - `REPLACE_WITH_CLIENT_ID`
   - `REPLACE_WITH_CLIENT_SECRET`

## Zones fonctionnelles

- **Vue d’ensemble** : KPI globaux + synthèse activité.
- **Analyse Utilisateur** : segmentation comptes, drillthrough vers détail.
- **Analyse Licences** : stock, affectations, dépassements, niveau de risque.
- **Détail Utilisateur** : profil 360, activité applicative, licences affectées.

## Notes

- Les secrets ne doivent jamais être commités dans Git.
- Le drillthrough utilisateur est configuré pour transmettre uniquement le contexte utilisateur.
