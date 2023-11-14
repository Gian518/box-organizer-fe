import { t } from "i18next"
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
					<House /> <span>{t('home')}</span>
				</NavLink>
			</Nav.Item>
			{/* History */}
			<Nav.Item>
				<NavLink to='/history' className={({ isActive, isPending }) => isActive ? 'item-selected' : 'item'}>
					<ClockHistory /> <span>{t('history')}</span>
				</NavLink>
			</Nav.Item>
		</Navbar>
	)
}

export default Menu