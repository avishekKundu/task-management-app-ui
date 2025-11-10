/**
 * utils: ROI safe calculation, stable sort comparator
 */
export function computeROI(revenue, timeTaken) {
    const r = Number(revenue);
    const t = Number(timeTaken);
    if (isNaN(r) || isNaN(t)) return null;
    if (t === 0) return 0;
    const roi = r / t;
    return Number(roi.toFixed(2));
}

/**
 * priority order: HIGH > MEDIUM > LOW
 */
const priorityRank = (p) => {
    if (!p) return 1;
    if (p === 'HIGH') return 3;
    if (p === 'MEDIUM') return 2;
    return 1;
};

/**
 * stable comparator: primary ROI desc, secondary priority desc, tertiary createdAt desc, quaternary title asc
 */
export function taskComparator(a, b) {
    const aR = a.roi === null || a.roi === undefined ? Number.NEGATIVE_INFINITY : Number(a.roi);
    const bR = b.roi === null || b.roi === undefined ? Number.NEGATIVE_INFINITY : Number(b.roi);
    if (aR !== bR) return bR - aR;

    const prA = priorityRank(a.priority);
    const prB = priorityRank(b.priority);
    if (prA !== prB) return prB - prA;

    const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    if (ta !== tb) return tb - ta;

    const taTitle = (a.title || '').toLowerCase();
    const tbTitle = (b.title || '').toLowerCase();
    if (taTitle < tbTitle) return -1;
    if (taTitle > tbTitle) return 1;
    return 0;
}
