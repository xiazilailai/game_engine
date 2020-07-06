
import * as Phaser from 'phaser';
import styles from './Phaser.less';
import React, { useState, useRef, useEffect } from 'react';
import { useMount, useSize, useDebounceEffect } from 'ahooks';
//
import { Space } from 'antd';
import dog from '@pub/images/0.png';
export default () => {

  const phaserContainer = useRef();
  const size = useSize(phaserContainer);
  useDebounceEffect(() => {
    console.log(size, phaserContainer.current);
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: size.width,
      height: size.height,
      backgroundColor: '#2d2d2d',
      parent: phaserContainer.current,
      scene: {
        preload: function (){ // 不可以用箭头函数
          console.log(this, 'preload .................'); 
          this.load.image('dog', dog); // 这里 this 指向一个 Scene 对象
        },
        create: function () {
          this.add.sprite(150, 170, 'dog');
        },
      },
    });
    console.log(game);
  }, [size]);
  return (
    <div className={styles.container}>
      <h1>
        <Space>
          游戏引擎 - Phaser.js {'V' + Phaser.VERSION}
          <a href="https://www.phaser-china.com/example.html" target="_blank">Demo 示例</a>
          <a href="https://www.phaser-china.com/doc.html" target="_blank">API 中文</a>
        </Space>
      </h1>
      <div className={styles.phaser} ref={phaserContainer}>
        {/* {JSON.stringify(size)} */}
      </div>
    </div>
  );
}
