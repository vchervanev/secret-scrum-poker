import React from 'react'
import { shallow } from 'enzyme'

import { MODE, Room } from '.'

describe('Room', () => {
  const shallowRender = (mode, actions = {}) =>
    shallow(<Room state={{ mode: mode }} actions={actions} />)

  it('renders Reconnect when offline', () => {
    const wrapper = shallowRender(MODE.OFFLINE).find('Reconnect')
    expect(wrapper.length).toEqual(1)
  })

  it('uses Connect action in Reconnect', () => {
    const actions = { connect: jest.fn() }
    const wrapper = shallowRender(MODE.OFFLINE, actions).find('Reconnect')

    expect(wrapper.props()).toMatchObject(actions)
  })

  it('renders Loading when connecting', () => {
    const wrapper = shallowRender(MODE.CONNECTING)
    expect(wrapper.find('Loading').length).toEqual(1)
  })

  it('renders Entrance when online', () => {
    const wrapper = shallowRender(MODE.ONLINE)
    expect(wrapper.find('Entrance').length).toEqual(1)
  })

  it('renders Loading when entering the room', () => {
    const wrapper = shallowRender(MODE.JOINING)
    expect(wrapper.find('Loading').length).toEqual(1)
  })

  it('renders PointsGame when playing', () => {
    const wrapper = shallowRender(MODE.PLAY)
    expect(wrapper.find('PointsGame').length).toEqual(1)
  })
})
