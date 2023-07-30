import {
	AbsoluteFill,
	Sequence,
	Audio,
	Img,
	Series,
	useVideoConfig,
	spring,continueRender, delayRender, random
} from 'remotion';
import data from '../../Public/data.json';
import {noise3D} from '@remotion/noise';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

// import { TransitionSeries } from 'remotion-transition-series';
const OVERSCAN_MARGIN = 100;
const ROWS = 10;
const COLS = 15;





//const style_array = generateRandomArray(0, 2, data['image'].length);



export const Voice = (props) => {
	const {width, height, fps, durationInFrames} = useVideoConfig();

	//console.log('this musique' + durationInFrames); // 300
	return (
		<AbsoluteFill>
			<Audio volume={0.5} src={data['audio'][props.voice]} />
		</AbsoluteFill>
	);
};




export const Part = ({duration_voice_tab, i, randr, random_tableright}) => {



	console.log("l= ", (random_tableright))
	console.log("i", i)
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const margin = 1 + (4 / (durationInFrames / 2)) * (frame / 2);
	const scaled_one = interpolate(frame, [0, durationInFrames / 2], [1.1, 1.4]);
var tab = [0, 1, 2, 3, 0, 1, 2, 3]
	const stylesleft = {
		0: {transform: `scale(${scaled_one})`},
		1: {
			transform: `scale(${scaled_one})`,
			marginRight: frame
		},
		2: {
			transform: `scale(${scaled_one})`,
			marginLeft: frame ,
		},
		3: {
			transform: `scale(${scaled_one})`,
			marginTop: frame,
		}
	};
	return(<Series>

		<Series.Sequence durationInFrames={parseInt(duration_voice_tab[Math.floor(i/2)] * 30) / 2 + 4}>
		<Img  src={data['image'][random_tableright[i]]} />
		</Series.Sequence>
		<Series.Sequence
				durationInFrames={parseInt(duration_voice_tab[Math.floor(i/2)] * 30) / 2}
			>
				<Img  src={data['image'][i + 1]} />
			</Series.Sequence>
	</Series>)
}






















export const Part1 = ({duration_voice_tab, i, randr, random_tableright}) => {


const [styleframe, setStyleframe] = useState(0);
const [loaded, setLoaded] = useState(false);
const [I , setI] = useState(0);
var tab = random_tableright
console.log("tab", tab)
var exem = tab[0];
	// console.log("exem= ", exem)
	// console.log("l= ", randr)
	// console.log("r= ", random_tableright)
	// console.log("l type= ", typeof(randr))
	// console.log("i type= ", typeof(i))
	// console.log("count= ", i)
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const margin = 1 + (4 / (durationInFrames / 2)) * (frame / 2);
	const scaled_one = interpolate(frame, [0, durationInFrames / 2], [1.1, 1.4]);
	const scaled_two = interpolate(
		frame - durationInFrames / 2,
		[0, durationInFrames / 2],
		[1, 1.4]
	);
	console.log('scaled' + (frame - durationInFrames / 2));

	const stylesleft = {
		0: {transform: `scale(${scaled_one})`},
		1: {
			transform: `scale(${scaled_one})`,
			marginRight: frame
		},
		2: {
			transform: `scale(${scaled_one})`,
			marginLeft: frame ,
		},
		3: {
			transform: `scale(${scaled_one})`,
			marginTop: frame,
		}
	};



	const stylesright = {
		0: {transform: `scale(${scaled_two})`},
		1: {
			transform: `scale(${scaled_two})`,
			marginRight: frame - durationInFrames / 2,
		},
		2: {
			transform: `scale(${scaled_two})`,
			marginLeft: frame - durationInFrames / 2,
		},
		3: {
			transform: `scale(${scaled_two})`,
			marginTop: frame - durationInFrames / 2,
		}
	};
	//console.log('frame' + frame);
	//console.log("test"+test)
	//console.log(frame)
	// console.log('margin' + (1+(4/(durationInFrames/2))*(frame/2)))
	//  const marginLeft = interpolate(driver, [0, 90], [0, 1.23]);
	//console.log("duration = "+(frame-durationInFrames/2))

	//console.log("random test",Math.random() * (3 - 0 + 1) + 0)
	var tab =[0, 1, 2, 3]
	console.log("test", stylesright[randr])
	//console.log("test1", randr)
		return(<Series>
			<Series.Sequence
				durationInFrames={parseInt(duration_voice_tab[Math.floor(i/2)] * 30) / 2 + 4}
			>
				
				<Img style={stylesleft[tab[i]]} src={data['image'][i]} />
				{console.log("test2", stylesright[randr])}
			</Series.Sequence>

			<Series.Sequence
				durationInFrames={parseInt(duration_voice_tab[Math.floor(i/2)] * 30) / 2}
			>
				<Img style={stylesright[i]} src={data['image'][i + 1]} />
			</Series.Sequence>
		</Series>
	
	);
};

export const PartSequence = ({duration_voice_tab, random_tableft, random_tableright}) => {
	
	const [random_tab, setRandomtab] = useState(random_tableright);
	useEffect(() => {
	setRandomtab(random_tableright)
	  }, []); 
	console.log("random_tab = ", random_tab)	
	var init_rand =  Math.floor(Math.random() * (3 - 0 + 1)) + 0
	//console.log("ri2", rand)
	return (
		<Series>
			{duration_voice_tab.length > 0 &&
				((rows, i, len) => {
					for (var i = 0, randr =  0 + 0; i < duration_voice_tab.length*2 ; i+=2, randr= parseInt( Math.floor(Math.random() * (3 - 0 + 1)) + 0)) {
					//	var randr =  Math.floor(Math.random() * (3 - 0 + 1)) + 0
						
						console.log("ri= "+typeof(i))
						console.log("ri1= "+typeof( randr))

						//console.log("ri3= "+randr)
						console.log("duration_voice_tab = "+duration_voice_tab.length)
						console.log("duration_voic = "+Math.floor(i/2))
						console.log("output ="+data['audio'][Math.floor(i/2)])
						//console.log(data['audio']);
							//console.log(duration_voice_tab.length)
						//console.log(data['audio'][i])
//							console.log(duration_voice_tab[i])
						//	console.log(data['image'][i])

						rows.push(
							<Series.Sequence
								durationInFrames={parseInt(duration_voice_tab[Math.floor(i/2)] * 30)}
							>
								<Part i={i} randr={ parseInt(Math.floor(Math.random() * (3 - 0 + 1)) + 0)}  duration_voice_tab={duration_voice_tab} random_tableright={random_tableft}   />
								<Voice voice={Math.floor(i / 2)} />
							</Series.Sequence>
						);
					}

					return rows;
				})([], 0, duration_voice_tab.length)}
		</Series>
	);
};

export const TiktokRenderComp = ({duration_voice_tab, random_array}) => {

console.log("yann furrer",random_array)
	const [random_tab, setRandomtab] = useState([]);
	const [random_tableft, setRandomtableft] = useState([]);
	const [random_tableright, setRandomtableright] = useState([]);
	//const [handle] = useState(() => delayRender());



// 	async function RandomF () {

		    
// 			//console.log(audioUrl);
// 			try {
// 			//temp_tab.push(generateRandomArray(0, 3, data['image'].length))
// 			  } catch (error: any) {
// 				console.error(`Erreur lors de la récupération de la durée de ${error.message}`);
// 			  }

// 		return  generateRandomArray(0, 3, data['image'].length);
	
		
// 	  };
	
	
	
	
	
// 	  function generateRandomArray(min, max, length) {
// 		var randomArray = [];
// 		for (var i = 0; i < length; i++) {
// 			var randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
// 			 randomArray.push(randomValue);
// 		}
// 		return randomArray;
// 	}
//  console.log("gen", generateRandomArray(0, 3, data['image'].length))





// 	useEffect(() => {

// console.log("random_tab = ")
// 		RandomF(0, 3, data['image'].length).then((random : any) => {
// 			console.log("rand", random)
// 			setRandomtableft(random)
// 		//	continueRender(handle);
// 		});
	
// 		RandomF(0, 3, data['image'].length).then((random : any) => {
// 			console.log("rand2",random)
// 			setRandomtableright(random)
// 			continueRender(handle);
// 		});



//	  }, [handle ]); 
	//var scale = interpolate(frame, [0, 30], [0, 1]);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 100,
				backgroundColor: 'none',
			}}
		>
			{/* <NoiseComp style={{ position: 'relative', zIndex: 1 }} speed={0.01} circleRadius={20} maxOffset={50}/> */}
			<PartSequence duration_voice_tab={duration_voice_tab} random_tableft={random_array} random_tableright={random_array} />
		</AbsoluteFill>
	);
};