import { baseAlcohols, colors, flavors } from './types'

export const baseFilters = [
  {
    displayName: 'Alkohol Bazowy',
    name: 'baseAlcohol',
    options: baseAlcohols,
  },
  {
    displayName: 'Smak',
    name: 'taste',
    options: flavors,
  },
  {
    displayName: 'Kolor',
    name: 'color.label',
    options: colors.map((color) => color.label),
  },
]
