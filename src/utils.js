import * as turfRandom from '@turf/random';
import * as Immutable from 'immutable';

export function slugify(str) {
  return str.toLowerCase().replace(/\s/g, '-');
}

export var markers = [
  {
    name: 'DevMountain',
    latlng: [40.226294, -111.660776],
  }
];
//DEFAULT CENTER
export var mapConfig = {
  center: [40.2262, -111.6607],
  zoom: 0
};
//DEFAULT CENTER
const points = turfRandom('points', 50000, { bbox: [13.0535, 52.3303, 13.7262, 52.6675] });
export const locations = Immutable.fromJS(points.features.map(feat => feat.geometry.coordinates));


export const scatterPlotData = points.features.map(feat => (
  { position: feat.geometry.coordinates,
    radius: 1,
    color: [255, 0, 0]
  }
));

export function getColor(d) {
  const z = d.start[2];
  const r = z / 10000;

  return [255 * ((1 - r) * 2), 128 * r, 255 * r, 255 * (1 - r)];
}