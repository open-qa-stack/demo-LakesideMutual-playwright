# Calcul du risque (`risk-computation`)

Calcul des facteurs de risque d’un client à partir des informations transmises.

## Périmètre

Calcul du risque : calcul des facteurs de risque d’un client à partir des informations transmises.

| Opération | Rôle | Requête | Réponse |
|---|---|---|---|
| `POST /riskfactor/compute` | Calcule le facteur de risque d’un client à partir de sa requête. | Corps `RiskFactorRequestDto` : `birthday` (string), `postalCode` (string). | `200` : `RiskFactorResponseDto`, contenant `riskFactor` (integer). |

## Schémas

### `RiskFactorRequestDto`

Fournit les informations nécessaires au calcul :

- `birthday` (string)
- `postalCode` (string)

### `RiskFactorResponseDto`

Retourne le facteur de risque calculé :

- `riskFactor` (integer)

## Liens et usage

`POST /riskfactor/compute` reçoit `RiskFactorRequestDto` et renvoie `RiskFactorResponseDto`. Les informations d’entrée sont celles à transmettre pour effectuer le calcul ; aucune autre entrée, valeur de retour ou règle de calcul n’est précisée.

Ce domaine porte sur le calcul du risque. Les informations client relèvent du domaine `customers`; les demandes de devis et leurs réponses relèvent de `insurance-quote-requests`, et les contrats d’assurance du domaine `policies`.
