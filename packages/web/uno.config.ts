import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  shortcuts: {
    'bg-accent': 'bg-gray-200 dark:bg-gray-800',
  },
})
