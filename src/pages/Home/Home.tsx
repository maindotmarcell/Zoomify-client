import React, {
	MutableRefObject,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './Home.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import { io, Socket } from 'socket.io-client';
import axios from '../../constants/axios';
import { Flex, Button, IconButton, Textarea, Heading } from '@chakra-ui/react';
import { MdOutlineContentCopy, MdLocalPhone } from 'react-icons/md';
import { IUserContext } from '../../types/maintypes';

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
	const [name, setName] = useState('');

	const myVideo = useRef() as MutableRefObject<HTMLVideoElement>;
	const userVideo = useRef() as MutableRefObject<HTMLVideoElement>;
	const connectionRef = useRef() as MutableRefObject<Peer.Instance>;
	const socket = useRef() as MutableRefObject<Socket>;

	const { userObject } = useContext(UserContext) as IUserContext;

	useEffect(() => {
		// create socket.io (wrapped websocket) connection
		socket.current = io(`${axios.defaults.baseURL}`);

		// set our own video
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream: MediaStream) => {
				setStream(stream);
				myVideo.current.srcObject = stream;
			});

		// define handlers for possible incoming socket.io events
		socket.current.on('me', (id: string) => {
			// for getting socket id
			console.log(id);
			setMe(id);
		});

		socket.current.on('callUser', (data) => {
			// for setting up incoming call
			setReceivingCall(true);
			setCaller(data.from);
			setName(data.name);
			setCallerSignal(data.signal);
		});

		socket.current.on('callDeclined', () => {
			// decline handler code will come here
			window.location.reload();
		});
	}, []);

	useEffect(() => {
		socket.current.on('userLeft', (data) => {
			// for handling peer disconnection
			console.log(
				'🚀 ~ file: Home.tsx:74 ~ socket.current.on ~ caller',
				caller
			);
			console.log(
				'🚀 ~ file: Home.tsx:74 ~ socket.current.on ~ data.disconnectedUser',
				data.disconnectedUser
			);
			if (data.disconnectedUser === caller) {
				setReceivingCall(false);
				// setCaller('');
				// setCallAccepted(false);
				// setCallerSignal('');
				window.location.reload();
			}
		});
	}, [caller]);

	// ------------ Handler functions to initiate call, accept call and end call -----------------------

	const callUser = (id: string) => {
		// initialising peer connection
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});
		peer._debug = console.log;
		console.log(
			'🚀 ~ file: Home.tsx:86 ~ callUser ~ peer.destroyed',
			peer.destroyed
		);

		// signal is what takes care of the TCP handshake and open connection between peers
		peer.on('signal', (data) => {
			socket.current.emit('callUser', {
				userToCall: id,
				signalData: data,
				from: me,
				name: userObject.username,
			});
		});

		// setting peer's video stream when it is sent to us
		peer.on('stream', (stream: MediaStream) => {
			userVideo.current.srcObject = stream;
		});

		socket.current.on('callAccepted', (signal) => {
			setCallAccepted(true);
			// we are setting the caller, or in other words partner, so we can disconnet properly:
			setCaller(idToCall);
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
		peer._debug = console.log;
		peer.on('signal', (data) => {
			socket.current.emit('answerCall', { signal: data, to: caller });
		});
		peer.on('stream', (stream) => {
			userVideo.current.srcObject = stream;
		});

		peer.signal(callerSignal);
		connectionRef.current = peer;
	};

	const declineCall = () => {
		const partner = caller;
		setReceivingCall(false);
		setCaller('');
		setCallAccepted(false);
		setCallerSignal('');
		socket.current.emit('declineCall', { to: partner });
	};

	const leaveCall = () => {
		setReceivingCall(false);
		setCaller('');
		setCallAccepted(false);
		setCallerSignal('');
		connectionRef.current.destroy();
		window.location.reload();
	};

	return (
		<div>
			<Heading as="h1">Zoomify: Marcell's Wonder Video Chat</Heading>
			<Heading as="h2">Welcome back {userObject.username}</Heading>
			<Flex
				height="100vh"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
			>
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
							{callAccepted ? (
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
						{callAccepted ? (
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
						{caller}
					</div>
				</div>
				<div>
					{receivingCall && !callAccepted ? (
						<div className="caller">
							<h1>
								{/* From: {caller}, {name} is calling... */}
								From:{name} is calling...
							</h1>
							<Button variant="contained" color="primary" onClick={answerCall}>
								Answer
							</Button>
							<Button variant="contained" color="primary" onClick={declineCall}>
								Decline
							</Button>
						</div>
					) : null}
				</div>
			</Flex>
		</div>
	);
}
