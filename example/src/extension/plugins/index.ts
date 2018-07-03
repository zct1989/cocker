import Vue from 'vue'

import filterPlugin from './filter.plugin'
import commonPlugin from './common.plugin'

export default ({ store }) => ({
  commonPlugin,
  filterPlugin
})
