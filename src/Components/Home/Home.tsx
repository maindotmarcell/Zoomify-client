import React, {
	MutableRefObject,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { myContext } from '../../context/UserContext';
import styles from './Home.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import { io, Socket } from 'socket.io-client';
import axios from '../../constants/axios';
import { Button, IconButton, Textarea } from '@chakra-ui/react';
import { MdOutlineContentCopy, MdLocalPhone } from 'react-icons/md';

export default function Home() {
	const [me, setMe] = useState('');
	const [stream, setStream] = useState<MediaStream>();
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState('');
	const [callerSignal, setCallerSignal] = useState<Peer.SignalData | string>(
		''
	);
	const [callAccepted, setCallAccepted] = useState(false);
	const [idToCall, setIdToCall] = useState('');
	const [callEnded, setCallEnded] = useState(false);
	const [name, setName] = useState('');

	const myVideo = useRef() as MutableRefObject<HTMLVideoElement>;
	const userVideo = useRef() as MutableRefObject<HTMLVideoElement>;
	const connectionRef = useRef() as MutableRefObject<Peer.Instance>;
	const socket = useRef() as MutableRefObject<Socket>;

	const { userObject } = useContext(myContext) as any;

	useEffect(() => {
		socket.current = io(`${axios.defaults.baseURL}`);

		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setStream(stream);
				myVideo.current.srcObject = stream;
			});

		socket.current.on('me', (id: string) => {
			console.log(id);
			setMe(id);
		});

		socket.current.on('callUser', (data) => {
			setReceivingCall(true);
			setCaller(data.from);
			setName(data.name);
			setCallerSignal(data.signal);
		});
	}, []);

	const callUser = (id: string) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});

		peer.on('signal', (data) => {
			socket.current.emit('callUser', {
				userToCall: id,
				signalData: data,
				from: me,
				name: userObject.username,
			});
		});

		peer.on('stream', (stream: MediaStream) => {
			userVideo.current.srcObject = stream;
		});

		socket.current.on('callAccepted', (signal) => {
			setCallAccepted(true);
			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const answerCall = () => {
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		peer.on('signal', (data) => {
			socket.current.emit('answerCall', { signal: data, to: caller });
		});
		peer.on('stream', (stream) => {
			userVideo.current.srcObject = stream;
		});

		peer.signal(callerSignal);
		connectionRef.current = peer;
	};

	const leaveCall = () => {
		setCallEnded(true);
		connectionRef.current.destroy();
	};

	return (
		<div>
			{userObject ? (
				<h1>Welcome back {userObject.username}</h1>
			) : (
				<h1>Welcome to the website anonymous user</h1>
			)}
			<h1>Marcell's Wonder Video Chat</h1>
			<div className={styles.container}>
				<div className={styles.videoContainer}>
					<div className={styles.video}>
						{stream && (
							<video
								playsInline
								muted
								ref={myVideo}
								autoPlay
								style={{ width: '300px' }}
							/>
						)}
					</div>
					<div className={styles.video}>
						{callAccepted && !callEnded ? (
							<video
								playsInline
								ref={userVideo}
								autoPlay
								style={{ width: '300px' }}
							/>
						) : null}
					</div>
				</div>
			</div>
			<div className="myId">
				<p>Me: {me}</p>
				<CopyToClipboard text={me}>
					<Button
						variant="contained"
						color="primary"
						leftIcon={<MdOutlineContentCopy fontSize="large" />}
					>
						Copy ID
					</Button>
				</CopyToClipboard>

				<Textarea
					id="filled-basic"
					placeholder="ID to call"
					variant="filled"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button variant="contained" color="secondary" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<IconButton
							color="primary"
							aria-label="call"
							onClick={() => callUser(idToCall)}
						>
							<MdLocalPhone fontSize="large" />
						</IconButton>
					)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
					<div className="caller">
						<h1>
							From: {caller}, {name} is calling...
						</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
	);
}
