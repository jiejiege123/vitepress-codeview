/*
 * @Author: zzz
 * @LastEditors: zzz
 */
import path from 'path'
import fs from 'fs'
import { parse } from '@vue/compiler-sfc'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import hljs from 'highlight.js'
import { docRoot } from '../utils/paths'
import { language } from 'gray-matter'

const localMd = MarkdownIt()
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/

export const mdPlugin = (md) => {
  md.use(require('./markdown-it-custom-anchor'))

  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {

      const data = md.__data
      const hoistedTags = data.hoistedTags || (data.hoistedTags = [])

      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(docRoot, 'examples', `${sourceFile}`),
            'utf-8'
          )

          const existingScriptIndex = hoistedTags.findIndex((tag) => {
            return scriptSetupRE.test(tag)
          })

          if (existingScriptIndex === -1) {
  
            hoistedTags.push(`
            <script setup>
            const demos = import.meta.globEager('/examples/${
              sourceFile.split('/')[0]
            }/*.vue')

            </script>`)
          }
        }

        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        const { html, js, css, cssPreProcessor, jsPreProcessor } =
          generateCodePenSnippet(source)
        
        return `<VpDemo 
          :demos="demos" 
          source="${encodeURIComponent(
            hljs.highlight(source, {language: 'html'}).value
          )}" 
          path="${sourceFile}" 
          html="${html}" 
          js="${js}" 
          css="${css}" 
          css-pre-processor="${cssPreProcessor}" js-pre-processor="${jsPreProcessor}" raw-source="${encodeURIComponent(
            source
          )}" 
          description="${encodeURIComponent(localMd.render(description))}" >`
      } else {
        return '</VpDemo>'
      }
    },
  } )
}

function generateCodePenSnippet(source) {
  const { template, script, styles } = parse(source).descriptor
  const css = styles.pop()
  return {
    html: encodeURIComponent(template?.content ?? ''),
    js: encodeURIComponent((script || { content: '' }).content),
    css: encodeURIComponent(css?.content || ''),
    cssPreProcessor: css?.lang || 'none',
    jsPreProcessor: script?.lang || 'none',
  }
}
