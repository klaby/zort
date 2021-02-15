import { join } from 'path'
import { sync } from 'rimraf'

export const mockDir = (dir = __dirname) => ({
  themes: join(__dirname, 'themes'),
  temp: join(__dirname, 'temp'),
  dist: join(dir, 'dist'),
})

export const mockClean = () => sync(mockDir().dist)

export const mockSchemaJSON = () => ({
  oneFile: {
    zort: {
      'zort.json': JSON.stringify({
        name: 'Zort',
        type: 'dark',
      }),
    },
  },
  manyFiles: {
    zort: {
      'zort.json': JSON.stringify({
        name: 'Zort',
        type: 'dark',
      }),
      'zort.aye.json': JSON.stringify({
        name: 'Zort Aye',
        type: 'dark',
      }),
    },
  },
  invalid: {
    zook: {
      'zook.json': JSON.stringify({
        name: 'Zook',
        type: 'dark',
      }),
    },
  },
})

export const mockSCSSSchemaJSON = () => ({
  $beige: '#8f8d88',
  $black: '#000000',
  $blue: '#5677fc',
  $blush: '#e9dbdb',
  $cyan: '#00cecb',
  $green: '#23d18c',
  $grey: '#424b54',
  $orange: '#f0aa85',
  $pink: '#ff5d8f',
  '$primary-color': '#0d1117',
  $purple: '#a29bfe',
  $quince: '#f49e4c',
  $red: '#e84855',
  '$secondary-color': '#23d18c',
  $spiced: '#eab464',
  $squash: '#f38375',
  $white: '#ffffff',
  $yellow: '#ffe066',
})
