package main

// Room is a client container
type Room struct {
	ID string
	Members []*ClientTransport
}

// NewRoom constructs a new room with its first member
func NewRoom(id string, member *ClientTransport) *Room {
	return &Room{id, []*ClientTransport{ member }}
}

// AddMember adds an extra member to the Room
func (r *Room) AddMember(member *ClientTransport) {
	// TODO think about members uniqueness
	r.Members = append(r.Members, member)
}

// RemoveMember removes a member from the Room
func (r *Room) RemoveMember(member *ClientTransport) {
	// TODO implement me
	panic("Not implemented")
}

// IsEmpty removes a member from the Room
func (r *Room) IsEmpty() bool {
	// TODO implement me
	panic("Not implemented")
}
