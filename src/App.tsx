import React from 'react'

// Third-party components
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom"

// Custom components
import Menu from 'Components/Menu'

// Libraries
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import env from './Config/env'
import it from './Languages/it.json'
import en from './Languages/en.json'

// Styles
import 'Styles/App.scss'

// Screens
import Home from 'Screens/Home'
import History from 'Screens/History'
import RegisterCode from 'Screens/RegisterCode'
import NotFound from 'Screens/NotFound'
import BoxView from 'Screens/BoxView'

i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: env.debug,
		fallbackLng: 'en',
		resources: {
			it: {
				translation: it
			},
			en: {
				translation: en
			}
		}
	})

const App: React.FC = () => {

	return (
		<>
			<BrowserRouter>
				<div className="main">
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/history' element={<History />} />
						<Route path='/register-code' element={<RegisterCode />} />
						<Route path='/box' element={<BoxView />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
				<Menu />
			</BrowserRouter>
		</>
	)
}

export default App