import React from 'react'
import { shallow } from 'enzyme'

import { Entrance } from '.'

describe('Entrance', () => {
  it('can be rendered', () => {
    const wrapper = shallow(<Entrance />)
  })
})
