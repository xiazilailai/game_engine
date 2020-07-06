
import * as PIXI from 'pixi.js';
import styles from './index.less';
import React, { useState, useRef, useEffect } from 'react';
import { useMount, useSize, useDebounceEffect } from 'ahooks';
// 
import { Space } from 'antd';
import dog from '@pub/images/0.png';
export default () => {
  // const [app, setApp] = useState(new PIXI.Application({
  //   width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
  // }));
  const pixiContainer = useRef();
  const size = useSize(pixiContainer);
  useDebounceEffect(() => {
    console.log(size.height);
    const app = new PIXI.Application({
      width: size.width,
      height: size.height,
      backgroundColor: 0x1099bb, 
      // resolution: window.devicePixelRatio || 1,
    });
    pixiContainer.current.appendChild(app.view);
    // 加载我们需要的纹理
    app.loader.add('bunny', dog).load((loader, resources) => {
      // 使用'bunny.png'图像创建纹理
      const bunny = new PIXI.Sprite(resources.bunny.texture);

      // 设置bunny的位置
      bunny.x = app.renderer.width / 2;
      bunny.y = app.renderer.height / 2;

      // 设置描点(旋转中心)为中心
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      // scale 缩放大小
      bunny.scale.set(0.5);

      // 将bunny添加到我们正在构建的场景中
      app.stage.addChild(bunny);

      // 监听帧更新
      app.ticker.add(() => {
        // 每帧我们都会旋转bunny一点
        bunny.rotation += 0.01;
      });
    });
  }, [size]);
  return (
    <div className={styles.container}>
      <h1>
        <Space>
        游戏引擎 - PIXI.JS {'V' + PIXI.VERSION}     
        <a href="https://pixijs.io/examples/" target="_blank">Demo 示例</a> 
        <a href="https://b.aitrade.ga/pixi.js-cn/PIXI.html" target="_blank">API 中文</a>
        </Space>
      </h1>
      <div className={styles.pixi} ref={pixiContainer}>
        {/* {JSON.stringify(size)} */}
      </div>
    </div>
  );
}
