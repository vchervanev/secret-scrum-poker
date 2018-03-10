package main

import "github.com/gorilla/websocket"

// Club stores all players, rooms and manages them
type Club struct {
	rooms   map[*websocket.Conn]*Room
	players map[*websocket.Conn]*Player
}

func newClub() *Club {
	return &Club{
		rooms:   make(map[*websocket.Conn]*Room),
		players: make(map[*websocket.Conn]*Player),
	}
}
