import React, { useRef, useEffect } from 'react';
import { Button } from 'antd';

import { useMouse, useSize, useMount, useUnmount } from 'ahooks';
import styles from './dog.less';
import dog_png from '@pub/images/dog.png';
export default () => {
  const {
    clientX,
    clientY,
  } = useMouse();
  const ref = useRef();
  const {
    width,
    height,
  } = useSize(ref);
  const canvas = useRef();

  const imgs = [];
  const loaders = [];
  const loadImg = async (imgSrc) => {
    const img = new Image();
    // imgs.push[img];
    return new Promise(resolve => {
      img.onload = () => {
        resolve(img);
      }
      img.src = imgSrc;
    });
  };
  const start = async () => {
    for(let i =0; i < 9; i ++){      
      const img = require(`@pub/images/${i}.png`);
      console.log(img);
      loaders.push(loadImg(img));
    }
    return new Promise(resolve => {
      Promise.all(loaders).then((loadedImgs) => {
        [].__proto__.push.call(imgs, ...loadedImgs);
        console.log(imgs);
        resolve();
      });
      
    });
  };
  let ctx;
  let step = 1;
  let counter = 0;
  const walk = (ctx) => {
    // console.log('walk...', step, counter);
    counter ++;
    if(step > 8){
      step = 1;
    }
    window.requestAnimationFrame(() => {
      walk(ctx);
    });
    if(counter > 3){ 
      const img = imgs[step];
      ctx.clearRect(0, 0, img.width, img.height);
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width/2, img.height/2);     
      step ++;
      counter = 0;
    }
    
  };
  useMount(async () => {
    // walk();
  });
  useUnmount(() => {
  })
  useEffect(() => {    
    const asyFun = async () => {      
      await start();
      ctx = canvas.current.getContext("2d");
      const img = imgs[step];
      ctx.clearRect(0, 0, img.width, img.height);
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width/2, img.height/2);
      console.log(ctx, 'mounted');
      walk(ctx);
    };
    asyFun();
    return () => {

    };
  }, []);
  return (
    <div className={styles.container}>
      <h1>Page Dog</h1>
      <p>Mouse Position: clientX: {clientX}, clientY: {clientY}</p>
      <p>
        <Button type="primary" onClick={walk}>动起来</Button>
      </p>
      <div className={styles.canvasContainer} ref={ref}>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </div>
  );
}
