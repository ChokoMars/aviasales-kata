import React from 'react';
import { useSelector } from 'react-redux';

import TicketList from '../TicketList';
import SortingTab from '../SortingTab';
import ErrorMsg from '../ErrorMsg';
import Spinner from '../Spinner';

import styles from './Main.module.scss';

const Main = () => {
  const isLoading = useSelector((state) => state.tickets.isLoading);
  const error = useSelector((state) => state.tickets.error);
  return (
    <div className={styles.main}>
      <SortingTab />
      {isLoading && <Spinner />}
      {error && <ErrorMsg />}
      {!error && <TicketList />}
    </div>
  );
};

export default Main;
