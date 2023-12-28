/**
 * Export des fonctions helpers pour la spécification HAL
 * Voir la spécification HAL : https://stateless.group/hal_specification.html
 * Voir la spécification HAL (RFC, source) : https://datatracker.ietf.org/doc/html/draft-kelly-json-hal
 */

/**
 * Retourne un Link Object, conforme à la spécification HAL
 * @param {*} url 
 * @param {*} type 
 * @param {*} name 
 * @param {*} templated 
 * @param {*} deprecation 
 * @returns 
 */
function halLinkObject(url, type = '', name = '', templated = false, deprecation = false) {

    return {
        "href": url,
        "templated": templated,
        ...(type && { "type": type }),
        ...(name && { "name": name }),
        ...(deprecation && { "deprecation": deprecation })
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} terrainData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapTerrainToResourceObject(terrainData, baseURL) {
    return {
        "_links": [{
            "self": halLinkObject(baseURL + '/terrains' + '/' + terrainData.nom, 'string'),
            "creneaux": halLinkObject(baseURL + '/terrains' + '/' + terrainData.nom + '/creneaux', 'string')
        }],

        "nom": terrainData.nom,
        "disponible": terrainData.disponible,
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} creneauData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapCreneauToResourceObject(creneauData, baseURL) {
    return {
        "_links": [{
            "self": halLinkObject(baseURL + '/creneaux' + '/' + creneauData.id, 'string'),
            "reservation": halLinkObject(baseURL + '/creneaux' + '/' + creneauData.id + '/reservation', 'string'),
            "creneau": halLinkObject('/creneaux' + '/' + creneauData.id, 'string')
        }],

        "Heure de début": creneauData.heure_debut,
        "Heure de fin": creneauData.heure_fin,
        "Jour": creneauData.jour,
        "disponible": creneauData.disponible,
    }
}


module.exports = { halLinkObject, mapTerrainToResourceObject, mapCreneauToResourceObject };
