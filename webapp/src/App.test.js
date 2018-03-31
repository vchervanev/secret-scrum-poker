import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import App from './App'

let appWrapper

beforeEach(() => {
  appWrapper = shallow(<App />)
})

it('renders RoomSubscriber', () => {
  expect(appWrapper.find('RoomSubscriber').length).toEqual(1)
})
