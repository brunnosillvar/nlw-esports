import { useEffect, useState } from 'react';
import './styles/main.css';
import logoImage from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAddBanner } from './components/CreateAddBanner';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		ads: number;
	};
}

function App() {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		axios('http://localhost:3333/games').then((response) => {
			setGames(response.data);
		});
	}, []);

	return (
		<div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
			<img src={logoImage} />
			<h1 className="text-6xl text-white font-black mt-20">
				Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
			</h1>
			<div className="grid grid-cols-6 gap-6 mt-16">
				{games.map((game) => {
					return <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />;
				})}
			</div>
			<Dialog.Root>
				<CreateAddBanner />
				<CreateAdModal />
			</Dialog.Root>
		</div>
	);
}

export default App;
