import {
	Composition,
	continueRender,
	delayRender,
	getInputProps,
} from 'remotion';
import {HelloWorld, myCompSchema} from './HelloWorld';
import {TiktokRenderComp} from './Tiktok/Tiktok_scene';
import {Logo, myCompSchema2} from './HelloWorld/Logo';

import {
	getAudioDurationInSeconds,
	getVideoMetadata,
	getAudioData,
} from '@remotion/media-utils';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
// Each <Composition> is an entry in the sidebar!
//data
//import data from '../Public/data.json';

export const RemotionRoot: React.FC = () => {
	const {gcp_id} = getInputProps(); // "world"

	//console.log(gcp_id);
	const [handle] = useState(() => delayRender());
	const [duration, setDuration] = useState(3);
	const [audioTab, setAudiotab] = useState([]);
	const [data, setData] = useState({});
	const [random_tab, setRandom_tab] = useState([]);

	useEffect(() => {
		fetchdata("UUMnhKdlBn").then((data: any) => {
			setData(data);
			console.log('data');
			console.log(data);
			calculateTotalDuration(data).then((totalDuration: any) => {
				setDuration(Math.round((totalDuration[0] - 3) * 30));
				var result = generateRandomArray(0, 3, data["image"].length)
				setRandom_tab(result);
				setAudiotab(totalDuration[1]);
				continueRender(handle);
			});
		});
	}, [handle]);

	console.log("zesrfzzefrsfzezrf",random_tab);
	console.log("aufio",audioTab)


	function generateRandomArray(min, max, length) {
		var randomArray = [];
		for (var i = 0; i < length; i++) {
			var randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
			 randomArray.push(randomValue);
		}
		//console.log(typeof(randomArray))
		return randomArray;
	}


	const fetchdata = async (gcp_id) => {
		console.log('response');
		const response = await fetch(
			`https://storage.googleapis.com/tiktok-jules/${gcp_id}/subtitle/data.json`
		).then((response) => response.json());
		console.log(response);
		return response;
	};

	const calculateTotalDuration = async (data) => {
		let totalDuration = 0;
		let duration_tab = [];
		// Utilisation d'une boucle for...of pour attendre chaque valeur avant de passer à la suivante
		for (const audioUrl of data.audio) {
			//console.log(audioUrl);
			try {
				const audioDuration = await getAudioDurationInSeconds(audioUrl);
				duration_tab.push(audioDuration);
				totalDuration += audioDuration;
			} catch (error: any) {
				console.error(
					`Erreur lors de la récupération de la durée de ${audioUrl}: ${error.message}`
				);
			}
		}

		return [totalDuration, duration_tab];
	};

	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="Tiktok"
				component={() => <TiktokRenderComp duration_voice_tab={audioTab} random_array={random_tab} />}
				durationInFrames={duration}
				fps={30}
				width={1080}
				height={1920}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				schema={myCompSchema}
				
			/>

			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
			<Composition
				id="OnlyLogo"
				component={Logo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				schema={myCompSchema2}
				defaultProps={{
					logoColor1: '#91dAE2' as const,
					logoColor2: '#86A8E7' as const,
				}}
			/>
		</>
	);
};
