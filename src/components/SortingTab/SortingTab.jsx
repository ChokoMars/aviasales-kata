import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import classNames from 'classnames/bind';

import { sortTicketByPrice, sortTicketByDuration, sortTicketOptimal } from '../../store/ticketsSlice';

import styles from './SortingTab.module.scss';

const SortingTab = () => {
  const dispatch = useDispatch();
  const [cheapSelect, setCheapSelect] = useState(false);
  const [fastSelect, setFastSelect] = useState(false);

  const [optimalSelect, setOptimalSelect] = useState(false);

  const cx = classNames.bind(styles);

  return (
    <div className={styles.tabs}>
      <div
        role="presentation"
        className={cx({
          tab: true,
          select: cheapSelect,
        })}
        onClick={() => {
          dispatch(sortTicketByPrice());
          setCheapSelect(true);
          setFastSelect(false);
          setOptimalSelect(false);
        }}
      >
        <span>САМЫЙ ДЕШЕВЫЙ</span>
      </div>
      <div
        role="presentation"
        className={cx({
          tab: true,
          select: fastSelect,
        })}
        onClick={() => {
          dispatch(sortTicketByDuration());
          setCheapSelect(false);
          setFastSelect(true);
          setOptimalSelect(false);
        }}
      >
        <span>САМЫЙ БЫСТРЫЙ</span>
      </div>
      <div
        role="presentation"
        className={cx({
          tab: true,
          select: optimalSelect,
        })}
        onClick={() => {
          dispatch(sortTicketOptimal());
          setCheapSelect(false);
          setFastSelect(false);
          setOptimalSelect(true);
        }}
      >
        <span>ОПТИМАЛЬНЫЙ</span>
      </div>
    </div>
  );
};

export default SortingTab;
