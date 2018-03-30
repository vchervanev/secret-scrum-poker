import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import App from './App'

let appWrapper

beforeEach(() => {
  appWrapper = shallow(<App />)
})

it('renders RoomContainer', () => {
  expect(appWrapper.find('RoomContainer').length).toEqual(1)
})
