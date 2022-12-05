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
import {
	Flex,
	Button,
	IconButton,
	Text,
	Heading,
	Stack,
	Input,
} from '@chakra-ui/react';
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
	const [calling, setCalling] = useState(false);

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
	}, []);

	useEffect(() => {
		socket.current.on('userLeft', (data) => {
			// for handling peer disconnection
			if (data.disconnectedUser === caller) {
				setReceivingCall(false);
				window.location.reload();
			}
		});
	}, [caller]);

	// ------------ Handler functions to initiate call, accept call and end call -----------------------

	const callUser = (id: string) => {
		setCalling(true);
		// initialising peer connection
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});
		peer._debug = console.log;

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

		socket.current.on('callAccepted', (data) => {
			setCallAccepted(true);
			setCalling(false);
			// we are setting the caller, or in other words partner, so we can disconnet properly:
			setCaller(idToCall);
			setName(data.name);
			peer.signal(data.signal);
		});

		socket.current.on('callDeclined', () => {
			setCalling(false);
			window.location.reload();
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
			socket.current.emit('answerCall', {
				signal: data,
				to: caller,
				name: userObject.username,
			});
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
		connectionRef.current.destroy();
		window.location.reload();
	};

	return (
		<div>
			<Flex flexDirection="column">
				<Flex margin={5} wrap="wrap" flexDirection="column">
					<Heading as="h1" size="4xl" noOfLines={1}>
						Zoomify
					</Heading>
					<Heading size="md">Marcell's Wonder Video Chat</Heading>
				</Flex>
			</Flex>
			<Flex
				margin={10}
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
			>
				<Flex flexDirection="row">
					<div className={styles.container}>
						<div className={styles.videoContainer}>
							<div className={styles.video}>
								{stream && (
									<video
										playsInline
										muted
										ref={myVideo}
										autoPlay
										style={{ width: '350px' }}
									/>
								)}
							</div>
							<div className={styles.video}>
								{callAccepted ? (
									<video
										playsInline
										ref={userVideo}
										autoPlay
										style={{ width: '350px' }}
									/>
								) : null}
							</div>
						</div>
					</div>
				</Flex>
				<Stack align="stretch">
					{/* <p>Me: {me}</p> */}
					<div className="call-button">
						{callAccepted ? (
							<Stack margin={2}>
								<Text>
									{name} ({caller})
								</Text>

								<Button variant="outline" colorScheme="red" onClick={leaveCall}>
									End Call
								</Button>
							</Stack>
						) : (
							<Stack>
								<CopyToClipboard text={me}>
									<Button
										variant="outline"
										colorScheme="gray"
										leftIcon={<MdOutlineContentCopy fontSize="large" />}
									>
										Copy my ID
									</Button>
								</CopyToClipboard>

								<Input
									id="filled-basic"
									placeholder="Paste partner's ID to call"
									variant="filled"
									value={idToCall}
									onChange={(e) => setIdToCall(e.target.value)}
								/>
								<IconButton
									color="primary"
									aria-label="call"
									onClick={() => callUser(idToCall)}
								>
									<MdLocalPhone fontSize="large" />
								</IconButton>
							</Stack>
						)}
					</div>
					{receivingCall && !callAccepted ? (
						<div className="caller">
							<h1>
								{/* From: {caller}, {name} is calling... */}
								{name} is calling...
							</h1>
							<Button
								margin={1}
								variant="outline"
								colorScheme="green"
								onClick={answerCall}
							>
								Answer
							</Button>
							<Button variant="outline" colorScheme="red" onClick={declineCall}>
								Decline
							</Button>
						</div>
					) : null}
				</Stack>
				{calling && <Text>Calling...</Text>}
			</Flex>
		</div>
	);
}
