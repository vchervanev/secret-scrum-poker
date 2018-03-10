package main

import "github.com/gorilla/websocket"

// Role defines which functions are available to a player
type Role int

// Roles
const (
	RoleHostPlayer Role = iota
	RolePlayer
	RoleMaster
	RoleSpectator
)

// Player is a Websocket client and poker room's participant
type Player struct {
	conn *websocket.Conn
	role Role
}
