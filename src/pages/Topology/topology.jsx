import styles from './topology.less';
import React, { useState, useRef, useEffect } from 'react';
import { useMount, useSize, useDebounceEffect } from 'ahooks';

//
import { Topology, Node } from '@topology/core';
import data from './json.js';
import { Tools } from './registerNode';
//
// import rotateCursor from '@pub/cursor/rotate.png';
export default () => {
  const container = useRef();
  const size = useSize(container);
  const [selectedNode, setSeleectedNode] = useState(null);
  const onDrag = (event, node) => {
    event.dataTransfer.setData(
      'Text',
      JSON.stringify({
        name: node.name,
        text: 'parent',
        image: node.icon,
        // lineWidth: 0,
        strokeStyle: 'rgba(0,0,0,0)',
        animatePlay: true,
        animateAlone: true,

        rect: {
          width: 50,
          height: 70,
        },
        children: node.children || null,
      }),
    );
  };
  const onClick = (canvas, node) => {
    console.log(node);
    // 如果有图标让图标转动
    if (node.name === 'device' && node?.children?.length) {
      animateRote(canvas, node.children[0]); // 默认第一个就是可以动画的图标
    }
  };
  const animateRote = (canvas, node) => {
    console.log(node);
    // 1. 设置node.animateFrames

    // 复制当前节点状态
    const state = Node.cloneState(node);
    // 修改状态位置
    state.rotate = 360;
    // state.image = '/cursor/rotate.png';
    node.animateFrames.push({
      duration: 2000,
      linear: true,
      state,
    });
    // 回到初始状态
    const state2 = Node.cloneState(node);
    node.animateFrames.push({
      duration: 0,
      linear: true,
      state: state2,
    });

    node.animateDuration = 0;
    for (const item of node.animateFrames) {
      node.animateDuration += item.duration;
    }
    // 2.A 设置开始播放属性（为当前时间）
    node.animateStart = Date.now();
    // 3. 通知画布刷新动画绘画
    canvas.animate();
  };
  useDebounceEffect(() => {
    const canvas = new Topology(container.current, {
      width: size.width,
      height: size.height,
      rotateCursor: '/cursor/rotate.png', // rotateCursor, // 两者皆可
      on: (event, data) => {
        console.log(event);
        switch (event) {
          case 'addNode':
            // addNode(canvas, data);
            break;
          case 'node':
            onClick(canvas, data);
            break;
        }
      },
    });
    console.log(canvas);
    // canvas.open(data);
    canvas.addNode({
      name: 'bgNode',
      text: '医院3F',
      image: '/images/3F.png',
      id: 'bgNode',
      locked: 2,
      rect: {
        x: 0,
        y: 0,
        width: 1920,
        height: 1550,
      },
    });

    canvas.resize({
      width: 1920,
      height: 1550,
    });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.shapes}>
        {Tools &&
          Tools.map(item => {
            return (
              <div
                className={styles.shape}
                key={item.label}
                draggable={true}
                onDragStart={event => {
                  onDrag(event, item);
                }}
                title={item.label}
              >
                <img src={item.icon} />
              </div>
            );
          })}
      </div>
      <div className={styles.main} ref={container}></div>
      <div className={styles.properties}>
        {selectedNode && JSON.stringify(selectedNode, null, '  ')}
      </div>
    </div>
  );
};
