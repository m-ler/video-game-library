import React from 'react';
global.React = React;
global.matchMedia = jest.fn().mockImplementation(query => ({
	matches: false,
	media: query,
	onchange: null,
	addEventListener: jest.fn(),
	removeEventListener: jest.fn(),
	dispatchEvent: jest.fn(),
}));

global.HTMLElement.prototype.scrollIntoView = jest.fn();
