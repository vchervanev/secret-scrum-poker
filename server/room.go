package main

// RoomStatus defines actions available to room's players
type RoomStatus byte

// Possible RoomStatus values
const (
	StatusWaiting RoomStatus = iota
	StatusVote
	StatusResults
)

// Room is a poker room and clients container
type Room struct {
	players map[*Player]Role
}
