/* eslint-disable prettier/prettier */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import About from '../pages/About';

const Router = () => (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/DashboardPage" element={<DashboardPage />} />
		<Route path="/About" element={<About />} />
	</Routes>
);

export default Router;
