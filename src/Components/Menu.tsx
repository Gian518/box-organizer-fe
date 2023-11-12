import React from "react"
import { Nav, Navbar } from "react-bootstrap"
import { ClockHistory, House } from "react-bootstrap-icons"
import { NavLink } from "react-router-dom"

const Menu: React.FC = () => {

	return (
		<Navbar fixed='bottom' className="navbar">
			{/* Home */}
			<Nav.Item>
				<NavLink to='/' className={({ isActive, isPending }) => isActive ? 'item-selected' : 'item'}>
					<House /> Home
				</NavLink>
			</Nav.Item>
			{/* History */}
			<Nav.Item>
				<NavLink to='/history' className={({ isActive, isPending }) => isActive ? 'item-selected' : 'item'}>
					<ClockHistory /> History
				</NavLink>
			</Nav.Item>
		</Navbar>
	)
}

export default Menu