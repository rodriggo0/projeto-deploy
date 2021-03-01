import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie'; 
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface Challenge{
    type: 'body' | 'eye';
    description : string;
    amount : number;

}

interface ChallengesContextData{
    level: number;
    currentExpirence:number;
    experienceToNextLevel: number;
    challengesCompleted:number;
    activeChallenge: Challenge;
    LevelUp: ()=> void;
    startNewChallenge:()=>void;
    resetChallenge: ()=> void;
    completedChallenge: ()=> void;
    closeLevelUpModal:()=> void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level:number;
    currentExpirence:number;
    challengesCompleted:number;
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function  ChallengesProvider({
    children, 
        ...rest
    } 
    :ChallengesProviderProps){
        
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExpirence, setCurrentExpirence] = useState(rest.currentExpirence ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const[activeChallenge, setActiveChallenge] = useState(null);

    const[isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)


    useEffect(() => {
        Notification.requestPermission();

    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExpirence', String(currentExpirence));
        Cookies.set('challengesCompleted', String(challengesCompleted));
       

    }, [level, currentExpirence, challengesCompleted]);


    function LevelUp(){
      setLevel(level+1);
      setIsLevelUpModalOpen(true)
  
    }
    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge() {
        const randonChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randonChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉',{
             body: `valendo ${challenge.amount}xp`   
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completedChallenge(){
        if (!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExpirence + amount;

        if(finalExperience  >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            LevelUp();
        }

        setCurrentExpirence(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }


    return (
        <ChallengesContext.Provider 
        value={{

            level, 
            currentExpirence, 
            experienceToNextLevel,
            challengesCompleted, 
            LevelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completedChallenge,
            closeLevelUpModal,
            }}>

            {children}
            
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>

    );
}
