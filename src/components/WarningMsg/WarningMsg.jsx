import React from 'react';

import styles from './WarningMsg.module.scss';

const WarningMsg = () => (
  <div className={styles.warning_msg}>Не найдено рейсов, удовлетворяющих заданным условиям.</div>
);

export default WarningMsg;
