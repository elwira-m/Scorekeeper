import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Player from "./components/Player/Player";
import PlayersList from './components/PlayersList/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';

it('renders without crashing', () => {
  shallow(<App />);
});

it('if AddPlayer works', () => {
	const appComponent = shallow(<App />);
	const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
	onPlayerAdd('Ania');
	const players = appComponent.state('players');
	
	expect(players.length).toEqual(3);
	expect(players[0].name).toEqual('Ania');
	expect(players[0].score).toEqual(5);
}),

it('should update player score', () => {
	const appComponent = shallow(<App />);
	let players = [
		{
			name: "Ania",
			score: 8
		},
		{
			name: "Antoś",
			score: 0
		}
	]
	appComponent.setState({ players });
	
	const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');
	onScoreUpdate(0, 3);
	const playersAfterUpdate = appComponent.state().players;
		
	expect(playersAfterUpdate[0].score).toEqual(11);
});

it('should remove player', () => {
	const appComponent = mount(<App />);
	let players = [
		{name: "Ania", score: 8},
		{name: "Antoś", score: 0}
	]
	appComponent.setState({ players });
	const onPlayerRemove = appComponent.find('PlayersList').prop('onPlayerRemove');
	onPlayerRemove(0);
	const playersAfterRemove = appComponent.state('players');
		
	expect(playersAfterRemove.length).toEqual(1); 	
});