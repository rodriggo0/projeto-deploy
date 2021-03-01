import Head from 'next/head';
import{GetServerSideProps} from 'next';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';


import styles from  '../styles/pages/Home.module.css';
import { CoutdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
  level:number;
  currentExpirence:number;
  challengesCompleted:number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
    level={props.level}
    currentExpirence ={props.currentExpirence}
    challengesCompleted={props.challengesCompleted}
    >




    <div className={styles.container}>
      <Head>
        <title>inicio | BH4SK4R4 </title>
      </Head>
      <ExperienceBar />
      <CoutdownProvider>
      <section>
        <div>
         <Profile />
         <CompletedChallenges />
         <Countdown />
        </div>

        <div>
          <ChallengeBox />
        </div>
      </section>
       </CoutdownProvider>
    </div>
    </ChallengesProvider>
  )
}

export const  getServerSideProps: GetServerSideProps = async (ctx)  => {
 
  const {level, currentExpirence, challengesCompleted} = ctx.req.cookies;
  
  return{
    props:{
      level: Number(level),
      currentExpirence:Number(currentExpirence),
      challengesCompleted:Number(challengesCompleted),
    }
  }

}