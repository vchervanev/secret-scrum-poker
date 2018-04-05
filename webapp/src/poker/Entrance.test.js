import React from 'react'
import { shallow } from 'enzyme'

import { Entrance } from '.'

describe('Entrance', () => {
  const shallowRender = props => {
    const defaultProps = { create: jest.fn(), join: jest.fn() }
    return shallow(<Entrance {...defaultProps} {...props} />)
  }

  it('renders join control', () => {
    const wrapper = shallowRender()
    expect(wrapper.find('.join').length).toEqual(1)
  })

  it('renders create control', () => {
    const wrapper = shallowRender()
    expect(wrapper.find('.create').length).toEqual(1)
  })

  it('renders room ID input control', () => {
    const wrapper = shallowRender()
    expect(wrapper.find('input.room-id').length).toEqual(1)
  })

  it('uses create callback when creating a room', () => {
    const spy = jest.fn()
    const wrapper = shallowRender({ create: spy })
    wrapper.find('.create').simulate('click')

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('uses join callback when joining a room', () => {
    const spy = jest.fn()
    const wrapper = shallowRender({ join: spy })
    wrapper.find('.create').simulate('click')

    wrapper.find('input.room-id').simulate('change', { target: { value: 'new-room-id' } })

    expect(spy).toHaveBeenCalledWith('new-room-id')
  })
})
