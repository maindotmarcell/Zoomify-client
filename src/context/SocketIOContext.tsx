import React, { useState, createContext, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import axios from '../constants/axios';
import { IUser } from '../types/maintypes';

export const SocketIOContext = createContext({});

export default function Context({ children }: React.PropsWithChildren) {

	return (
		<SocketIOContext.Provider
			value={{}}
		>
			{children}
		</SocketIOContext.Provider>
	);
}
