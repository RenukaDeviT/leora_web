import { useContext } from 'react';
import CallContext from './context';

// Instantiate SbCalls
const useSbCalls = () => useContext(CallContext);

export default useSbCalls;
