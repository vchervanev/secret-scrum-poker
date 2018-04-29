package main

import (
	"errors"
)

// RoomManager is test ConnManager implementation
type RoomManager struct {
	Membership map[*ClientTransport]*Room
	Rooms      map[string]*Room
}

// CreateRoom tries to register a new room
func (rm *RoomManager) CreateRoom(id string, creator *ClientTransport) (*Room, error) {
	// FIXME not thread safe
	if rm.Rooms[id] != nil {
		room := NewRoom(id, creator)
		rm.Rooms[id] = room
		rm.Membership[creator] = room
	}
	return nil, errors.New("Room ID already registered")
}

func (*RoomManager) onConnect(transport ClientTransport) {
	// FIXME define protocol
	transport.send("Welcome")
}

func (rm *RoomManager) onDisconnect(transport *ClientTransport) {
	room := rm.Membership[transport]
	room.RemoveMember(transport)
	if room.IsEmpty() {
		delete(rm.Rooms, room.ID)
	}
}
func (rm *RoomManager) onMessage(transport ClientTransport, message string) {
	panic("Not implemented")
}
