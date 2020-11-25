import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { entryWrap } from "@src/entryWrap";
import { Panel } from './Panel';

function App() {
	return (
		<Panel/>
	)
}

entryWrap(App);
