import * as React from 'react';
	
const checkPrime:Function = (no:number) => {
    for (let i = 2; i < no/2+1; i++){
        if ((no % i) == 0) return false;
    }
    return true;
}

const PrimeCounter: React.FC = () => {

	const [count, setCount] = React.useState(2);
    const isPrime = React.useMemo(()=>checkPrime(count),[count]);
	const [isFocussed, setIsFocussed] = React.useState(true);
	
    const setFocusFalse = React.useCallback(() => {
        setIsFocussed(false);
    },[])

    const setFocusTrue = React.useCallback(() => {
        setIsFocussed(true);
    },[]);

	React.useEffect(()=> {
	    window.addEventListener('blur', setFocusFalse);
	    window.addEventListener('focus', setFocusTrue);
	    
	    return () => {
	        window.removeEventListener('blur', setFocusFalse);
	        window.removeEventListener('focus', setFocusTrue);
	    }
	}, [])

	return (
		<button onClick={() => setCount(count+1)} style={{ color: isFocussed ? 'green' : 'red' }}>
			{count} is {isPrime ? '' : ' not'} a prime number
		</button>
	);
};

export default PrimeCounter;