import {
  defineConfig,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup,
  toEscapedSelector as e
} from 'unocss'

import {
  presetApplet,
  presetRemToRpx,
  transformerApplet,
  transformerAttributify
} from 'unocss-applet'

// UniApp
const isH5 = process.env.UNI_PLATFORM === 'h5'

export default defineConfig({
  presets: [
    /**
     * you can add `presetAttributify()` here to enable unocss attributify mode prompt
     * although preset is not working for applet, but will generate useless css
     */
    presetApplet({ enable: !isH5 }),
    presetAttributify(),
    presetRemToRpx({ enable: !isH5 })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify(),
    transformerApplet()
  ],
  rules: [
    [/hide-scroll/, (_, { rawSelector }) => {
      const selector = e(rawSelector)
      return `
        ${selector} ::-webkit-scrollbar {
          width: 0;
          height: 0;
          color: transparent;
          display: none;
        }
      `
    }],
    [/^cut-text-(\d+)$/, ([, line], { rawSelector }) => {
      const selector = e(rawSelector)
      return `
        ${selector} {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: ${line};
          -webkit-box-orient: vertical;
        }
      `
    }],
    [/^wtop-(\d+)$/, ([, topValue], { rawSelector }) => {
      const selector = e(rawSelector)
      return `
        ${selector} {
          top: calc(var(--window-top) + ${topValue}px)
        }
      `
    }],
    [/rich-text-fit-img/, (_, { rawSelector }) => {
      const selector = e(rawSelector)
      return `
        ${selector} img {
          max-width: 100%
        }
      `
    }]
  ]
})
