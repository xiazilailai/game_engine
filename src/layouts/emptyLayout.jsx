import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from '@/layouts/emptyLayout.less';

export default ({ children }) => {
  return (
    <PageHeaderWrapper className={styles.container}>
      {children}
    </PageHeaderWrapper>
  );
}
