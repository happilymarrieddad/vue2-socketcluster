const path = require('path')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const noderesolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const builtins = require('rollup-plugin-node-builtins')
const version = process.env.VERSION || require('../package.json').version
const banner =
`/**
 * Vue2Socketcluster v${version}
 * (c) ${new Date().getFullYear()} Nick Kotenberg
 * @license MIT
 */`

const resolve = _path => path.resolve(__dirname, '../', _path)

const configs = {
  umdDev: {
    input: resolve('src/index.js'),
    file: resolve('dist/vue2-socketcluster.js'),
    format: 'umd',
    env: 'development'
  },
  // umdProd: {
  //   input: resolve('src/index.js'),
  //   file: resolve('dist/vue2-socketcluster.min.js'),
  //   format: 'umd',
  //   env: 'production'
  // },
  commonjs: {
    input: resolve('src/index.js'),
    file: resolve('dist/vue2-socketcluster.common.js'),
    format: 'cjs'
  },
  esm: {
    input: resolve('src/index.esm.js'),
    file: resolve('dist/vue2-socketcluster.esm.js'),
    format: 'es'
  }
}

function genConfig (opts) {
  const config = {
    input: {
      input: opts.input,
      plugins: [
        builtins(),
        buble({
          transforms: { dangerousForOf: true }
        }),
        commonjs({
          include: ['node_modules/**'],
          extensions: [ '.js','.coffee' ]
        }),
        noderesolve({
          module: true,
          jsnext: true,
          main: true,
          preferBuiltins: true
        })
      ]
    },
    output: {
      banner,
      file: opts.file,
      format: opts.format,
      name: 'Vue2Socketcluster'
    },
    external: ['websocket']
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  return config
}

function mapValues (obj, fn) {
  const res = {}
  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key)
  })
  return res
}

module.exports = mapValues(configs, genConfig)
