import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const {level} = useContext(ChallengesContext);
    return(
        <div className={styles.profileContainer}>
          <img src="https:/github.com/rodriggo0.png"  alt="Rodriggo Marcelino"/>   
            <div>
              <strong>Rodriggo Marcelino</strong>
              
              <p>
                  <img src="icons/level.svg" alt="level"/>
                  level {level}
                  </p>
            </div>      
        </div>
    );
}